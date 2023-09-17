import { ValidationGroup } from "../../decorators/decorator.types";
import { deepEquals, hasErrors } from "../../shared";
import { Class } from "../../types/validation/Class.type";
import { DetailedErrors } from "../../types/validation/DetailedErrors.type";
import {
  CacheKey,
  EntityProcessorCache,
  EntityProcessorResult,
} from "../../types/validation/EntityProcessor.type";
import { Errors } from "../../types/validation/Errors.type";
import { Payload } from "../../types/validation/Payload.type";
import ValidationMetaService from "../service/impl/reflection.service.validation";
import { getClassFieldNames } from "../service/reflection.service";
import { ReflectionStrategyImpl } from "./reflection.strategy";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export type EntityProcessorConfig<TBody> = {
  defaultValue?: TBody;
  groups?: ValidationGroup[];
};

export default class EntityProcessor<TClass, TBody = TClass> {
  #meta: ValidationMetaService;
  #groups: ValidationGroup[];
  #hostDefault: TBody;
  #cache: EntityProcessorCache<TClass>;

  public static buildEmptyInstance<TClass, TBody = TClass>(
    clazz: Class<TClass>,
    defaultValue?: TBody | undefined
  ) {
    return (defaultValue ?? new clazz()) as TBody;
  }

  constructor(clazz: Class<TClass>, config?: EntityProcessorConfig<TBody>) {
    const groups = Array.from(new Set(config?.groups ?? []));
    const defaultValue = EntityProcessor.buildEmptyInstance(
      clazz,
      config?.defaultValue
    );
    this.#groups = groups;
    this.#hostDefault = defaultValue;
    this.#cache = {} as EntityProcessorCache<TClass>;
    this.#meta = ValidationMetaService.inject(clazz);
  }

  public isValid(state: Payload<TBody>): boolean {
    return this.#fromCache(state, "valid");
  }

  public getDetailedErrors(state: Payload<TBody>): DetailedErrors<TClass> {
    return this.#fromCache(state, "detailedErrors");
  }

  public getErrors(state: Payload<TBody>): Errors<TClass> {
    return this.#fromCache(state, "errors");
  }

  public validate(payload?: Payload<TBody>): EntityProcessorResult<TClass> {
    const state = payload ?? new this.#meta.class();
    const errors: Errors<TClass> = {};
    const detailedErrors: DetailedErrors<TClass> = {};

    getClassFieldNames(this.#meta.class).forEach((key) => {
      const descriptor = this.#meta.descriptor<any, any>(key);
      console.log(descriptor.strategy);
      if (!(descriptor.strategy in ReflectionStrategyImpl)) {
        throw new Error(
          `Validation strategy not implemented for field type '${descriptor.strategy}'`
        );
      }
      debugger;
      const strategyImplClass = ReflectionStrategyImpl[descriptor.strategy];
      const stratImpl = new strategyImplClass(descriptor, this.#hostDefault);
      const result = stratImpl.test(state[key], state, this.#groups);
      (detailedErrors as any)[key] = result[0];
      (errors as any)[key] = result[1];
    });

    return this.#saveCache({
      valid: this.#isValid(errors),
      detailedErrors,
      errors,
      state,
    });
  }

  #saveCache(cache: Partial<EntityProcessorCache<TClass, TBody>>) {
    // @ts-ignore
    Object.entries(cache).forEach(([key, value]) => (this.#cache[key] = value));
    return {
      valid: cache.valid!,
      detailedErrors: cache.detailedErrors!,
      errors: cache.errors!,
    };
  }

  #fromCache<K extends CacheKey<TClass>>(
    state: Payload<TBody>,
    key: K
  ): EntityProcessorResult<TClass>[K] {
    return this.#tryGetCache(
      state,
      this.#cache[key],
      () => this.validate(state)[key]
    );
  }

  #tryGetCache<K>(
    state: Payload<TBody>,
    cacheValue: K,
    valueGetter: () => K
  ): K {
    return cacheValue === undefined || !deepEquals(this.#cache.state, state)
      ? valueGetter()
      : cacheValue;
  }

  #isValid(errors: Errors<TClass>) {
    return !hasErrors(errors);
  }
}
