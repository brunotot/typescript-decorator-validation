import { Payload } from "tdv-core";
import { ValidationGroup } from "../../decorators/types/DecoratorProps.type";
import { Class } from "../../types/Class.type";
import { DetailedErrors } from "../../types/DetailedErrors.type";
import {
  CacheKey,
  EntityProcessorCache,
  EntityProcessorResult,
} from "../../types/EntityProcessor.type";
import { Errors } from "../../types/Errors.type";
import { getClassFieldNames } from "../../utils/class.utils";
import { deepEquals, hasErrors } from "../../utils/object.utils";
import ClassDescriptor, { Descriptor } from "../descriptor/ClassDescriptor";
import ValidationStrategy from "../validation-strategy/ValidationStrategy";
import ObjectArrayValidationStrategy from "../validation-strategy/impl/ObjectArrayValidationStrategy";
import ObjectValidationStrategy from "../validation-strategy/impl/ObjectValidationStrategy";
import PrimitiveArrayValidationStrategy from "../validation-strategy/impl/PrimitiveArrayValidationStrategy";
import PrimitiveValidationStrategy from "../validation-strategy/impl/PrimitiveValidationStrategy";

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

  public static getClassFieldNames<TClass, TBody = TClass>(
    clazz: Class<TClass>
  ) {
    return getClassFieldNames(clazz) as unknown as (keyof TBody)[];
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
    const descriptors = Object.values<Descriptor<unknown>>(this.schema);

    let errors: any = {};
    let detailedErrors: any = {};

    const executeStrategy = (
      descriptor: Descriptor<unknown>,
      strategyImplClass: Class<ValidationStrategy>
    ) => {
      const key = descriptor.name;
      const stratImpl = new strategyImplClass(descriptor, this.default?.[key]);
      const result = stratImpl.test(state[key], state, this.groups);
      detailedErrors[key] = result[0];
      errors[key] = result[1];
    };

    // prettier-ignore
    const exec = {
      "PRIMITIVE_ARRAY": PrimitiveArrayValidationStrategy,
         "OBJECT_ARRAY": ObjectArrayValidationStrategy,
            "PRIMITIVE": PrimitiveValidationStrategy,
               "OBJECT": ObjectValidationStrategy        
    }

    descriptors.forEach((d) => executeStrategy(d, exec[d.strategy]));

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
