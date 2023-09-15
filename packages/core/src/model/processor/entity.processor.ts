import { Payload } from "tdv-core";
import { ValidationGroup } from "../../decorators/decorator.types";
import { Class } from "../../types/Class.type";
import { DetailedErrors } from "../../types/DetailedErrors.type";
import {
  CacheKey,
  EntityProcessorCache,
  EntityProcessorResult,
} from "../../types/EntityProcessor.type";
import { Errors } from "../../types/Errors.type";
import { deepEquals, hasErrors } from "../../utils/object.utils";
import StrategyRegister from "../constants/strategy.constants";
import ClassDescriptor, { Descriptor } from "../descriptor/class.descriptor";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export type EntityProcessorConfig<TBody> = {
  defaultValue?: TBody;
  groups?: ValidationGroup[];
};

export default class EntityProcessor<TClass, TBody = TClass> {
  #descriptor: ClassDescriptor<TClass>;
  #cache: EntityProcessorCache<TClass>;

  get cache() {
    return this.#cache;
  }

  get schema() {
    return this.#descriptor.schema;
  }

  get groups() {
    return this.#descriptor.groups;
  }

  get class() {
    return this.#descriptor.class;
  }

  get default() {
    return this.#descriptor.default as any;
  }

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
    this.#cache = {} as EntityProcessorCache<TClass>;
    this.#descriptor = new ClassDescriptor(
      clazz,
      defaultValue as unknown as TClass,
      groups
    );
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
    const state = payload ?? this.default;
    const errors: Errors<TClass> = {};
    const detailedErrors: DetailedErrors<TClass> = {};

    this.#fieldDescriptors.forEach((descriptor) => {
      const key = descriptor.name;
      const strategyImplClass = StrategyRegister[descriptor.strategy];
      const stratImpl = new strategyImplClass(descriptor, this.default?.[key]);
      const result = stratImpl.test(state[key], state, this.groups);
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

  get #fieldDescriptors() {
    return Object.values<Descriptor<unknown>>(this.schema);
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
