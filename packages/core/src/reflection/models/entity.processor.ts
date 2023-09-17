import { deepEquals, hasErrors } from "../../shared";
import ns from "../../types/namespace/entity-processor.namespace";
import Validation from "../../types/namespace/validation.namespace";
import Class from "../../types/validation/class.type";
import DetailedErrors from "../../types/validation/detailed-errors.type";
import Errors from "../../types/validation/errors.type";
import Payload from "../../types/validation/payload.type";
import ValidationMetaService from "../service/impl/reflection.service.validation";
import { getClassFieldNames } from "../service/reflection.service";
import { ReflectionStrategyImpl } from "./reflection.strategy";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export default class EntityProcessor<TClass, TBody = TClass> {
  #meta: ValidationMetaService;
  #groups: Validation.Group[];
  #hostDefault: any;
  #cache: ns.Cache<TClass>;

  public static buildEmptyInstance<TClass, TBody = TClass>(
    clazz: Class<TClass>,
    defaultValue?: TBody | undefined
  ) {
    return (defaultValue ?? new clazz()) as TBody;
  }

  get hostDefault() {
    return this.#hostDefault;
  }

  constructor(clazz: Class<TClass>, config?: ns.Config<TBody>) {
    const groups = Array.from(new Set(config?.groups ?? []));
    const defaultValue = EntityProcessor.buildEmptyInstance(
      clazz,
      config?.defaultValue
    );
    this.#groups = groups;
    this.#hostDefault = defaultValue;
    this.#cache = {} as ns.Cache<TClass>;
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

  public validate(payload?: Payload<TBody>): ns.Result<TClass> {
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

  #saveCache(cache: Partial<ns.Cache<TClass, TBody>>) {
    // @ts-ignore
    Object.entries(cache).forEach(([key, value]) => (this.#cache[key] = value));
    return {
      valid: cache.valid!,
      detailedErrors: cache.detailedErrors!,
      errors: cache.errors!,
    };
  }

  #fromCache<K extends ns.CacheKey<TClass>>(
    state: Payload<TBody>,
    key: K
  ): ns.Result<TClass>[K] {
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
