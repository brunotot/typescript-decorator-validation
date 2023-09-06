import { ValidationGroup } from "../../decorators/types/DecoratorProps.type";
import { Class } from "../../types/Class.type";
import { DetailedErrors } from "../../types/DetailedErrors.type";
import {
  CacheKey,
  EntityProcessorCache,
  EntityProcessorResult,
} from "../../types/EntityProcessor.type";
import { Errors } from "../../types/Errors.type";
import { Payload } from "../../types/Payload.type";
import { ValidationMetadata } from "../../types/ValidationMetadata.type";
import { ValidationResult } from "../../types/ValidationResult.type";
import { DeducedArray } from "../../types/namespace/Strategy.ns";
import { $ } from "../../types/namespace/Utility.ns";
import { getClassFieldNames } from "../../utils/class.utils";
import { isValidationGroupUnion } from "../../utils/decorator.utils";
import { deepEquals, hasErrors } from "../../utils/object.utils";
import ClassMetadata from "../metadata/ClassMetadata";
import PropertyMetadata from "../metadata/PropertyMetadata";
import MetadataProcessor from "./MetadataProcessor";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export type EntityProcessorConfig<TBody> = {
  defaultValue?: TBody;
  groups?: ValidationGroup[];
};

export default class EntityProcessor<TClass, TBody = TClass> {
  #clazz: Class<TClass>;
  #groups: ValidationGroup[];
  #metadata!: ClassMetadata<TClass>;
  #cache: EntityProcessorCache<TClass>;
  #fields: (keyof TBody)[];
  #noArgsInstance: TBody;

  get metadata() {
    return this.#metadata;
  }

  get cache() {
    return this.#cache;
  }

  get groups() {
    return this.#groups;
  }

  get clazz() {
    return this.#clazz;
  }

  get fields() {
    return this.#fields;
  }

  get noArgsInstance() {
    return this.#noArgsInstance;
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
    return getClassFieldNames(clazz) as (keyof TBody)[];
  }

  constructor(clazz: Class<TClass>, config?: EntityProcessorConfig<TBody>) {
    const groups = config?.groups ?? [];
    this.#noArgsInstance = EntityProcessor.buildEmptyInstance(
      clazz,
      config?.defaultValue
    );
    this.#clazz = clazz;
    this.#groups = Array.from(new Set(groups));
    this.#cache = {} as EntityProcessorCache<TClass>;
    this.#fields = EntityProcessor.getClassFieldNames(clazz);
    this.#setMetadata(this.#noArgsInstance as Payload<TClass>);
  }

  public isValid(state: Payload<TClass>): boolean {
    return this.#fromCache(state, "valid");
  }

  public getDetailedErrors(state: Payload<TClass>): DetailedErrors<TClass> {
    return this.#fromCache(state, "detailedErrors");
  }

  public getErrors(state: Payload<TClass>): Errors<TClass> {
    return this.#fromCache(state, "errors");
  }

  //@stopwatch
  public validate(payload?: Payload<TClass>): EntityProcessorResult<TClass> {
    let errors: Errors<TClass> = {} as Errors<TClass>;
    let detailedErrors: DetailedErrors<TClass> = {} as DetailedErrors<TClass>;
    const state: Payload<TClass> =
      payload ?? (this.#noArgsInstance as Payload<TClass>);

    const instance: any = this.#metadata.createInstance(state);
    const entries = Object.entries(this.#metadata.validators);

    // prettier-ignore
    type ErrorDataApplierType<K = undefined> = (key: keyof DetailedErrors<TClass>, meta: PropertyMetadata<TClass>, validators: K) => void;

    // prettier-ignore
    const collectErrorData = (key: $.Keys<DetailedErrors<TClass>>, parentData: any, newSimpleErrorsValue: any, childData?: any) => {
      if (Array.isArray(childData)) {
        const data = { node: parentData, children: childData };

        this.#mutateErrors(
          key,
          detailedErrors,
          data,
          (errors as any),
          newSimpleErrorsValue
        );
      } else {

        this.#mutateErrors(
          key,
          detailedErrors,
          parentData,
          (errors as any),
          newSimpleErrorsValue
        );
      }
    };

    // prettier-ignore
    const handlePrimitive: ErrorDataApplierType<ValidationMetadata<any>[]> = (key, _, validators) => {
      const primitiveErrors = this.#extractInvalidResults(
        validators,
        instance[key],
        instance
      );
      collectErrorData(
        key,
        primitiveErrors,
        primitiveErrors.map((e) => e.message)
      );
    };

    // prettier-ignore
    const handlePrimitiveArray: ErrorDataApplierType<ValidationMetadata<any>[]> = (key) => {
      const stateValueArray = ((state as any)[key] as any[]);

      const prop = MetadataProcessor.fromClass(this.#clazz).getValidationProcessor(key as string)
      const primitiveArrayValidators = prop.node;
      const childrenArrayValidators = prop.children;

      const parentValidators = this.#extractInvalidResults(
        primitiveArrayValidators,
        stateValueArray,
        state
      );

      const childrenValidators = (stateValueArray ?? []).map((v: any) =>
        this.#extractInvalidResults(childrenArrayValidators, v, state)
      );

      collectErrorData(
        key,
        parentValidators,
        {
          node: parentValidators.map((e) => e.message),
          children: childrenValidators.map((e) =>
            e.map(({ message }) => message)
          ),
        },
        childrenValidators
      );
    };

    // prettier-ignore
    const handleObject: ErrorDataApplierType = (key, meta) => {
      const innerValidationHandler = new EntityProcessor(
        meta.clazz!,
        {
          defaultValue: (this.#noArgsInstance as any)[key],
          groups: this.#groups
        }
      );
      const { detailedErrors, errors } = innerValidationHandler.validate(
        (state as any)[key]
      );
      collectErrorData(key, detailedErrors, errors);
    };

    // prettier-ignore
    const handleObjectArray: ErrorDataApplierType<DeducedArray<ValidationMetadata<any>[]>> = (key, meta, validators) => {
      const innerValidationHandler = new EntityProcessor(
        meta.clazz!,
        {
          defaultValue: (this.#noArgsInstance as any)[key],
          groups: this.#groups
        }
      );
      const stateValueArray: any[] = (((state as any)?.[key] ?? [])as any[]);

      const parentValidators = this.#extractInvalidResults(
        validators.node,
        stateValueArray,
        state
      );

      const childrenValidators = stateValueArray.map((value: Object) =>
        innerValidationHandler.validate(value)
      );

      collectErrorData(
        key,
        parentValidators,
        {
          node: parentValidators.map((e) => e.message),
          children: childrenValidators.map(({ errors }) => errors),
        },
        childrenValidators
      );
    };

    for (const [_key, _validators] of entries) {
      const validators = _validators as any;
      const key = _key as keyof DetailedErrors<TClass>;
      const meta = new PropertyMetadata<TClass>(
        this.#clazz,
        key,
        (state as any)[key]
      );

      switch (meta.type) {
        case "OBJECT": {
          handleObject(key, meta, validators);
          break;
        }
        case "OBJECT_ARRAY": {
          handleObjectArray(key, meta, validators);
          break;
        }
        case "PRIMITIVE_ARRAY": {
          handlePrimitiveArray(key, meta, validators);
          break;
        }
        case "PRIMITIVE": {
          handlePrimitive(key, meta, validators);
          break;
        }
      }
    }

    const valid = this.#isValid(errors);

    this.#saveCache({
      detailedErrors,
      errors,
      valid,
      state,
    });

    return {
      valid,
      detailedErrors,
      errors,
    };
  }

  #setMetadata(state: Payload<TClass>) {
    this.#metadata = new ClassMetadata(
      this.#clazz,
      state as TClass,
      ...this.#groups
    );
  }

  #saveCache(cache: Partial<EntityProcessorCache<TClass>>) {
    // @ts-ignore
    Object.entries(cache).forEach(([key, value]) => (this.#cache[key] = value));
  }

  #extractInvalidResults<T>(
    validators: ValidationMetadata<T>[],
    value: T,
    parentInstance: any
  ): ValidationResult[] {
    return validators
      .filter(({ groups }) => isValidationGroupUnion(this.#groups, groups))
      .map(({ validate }) => validate(value, parentInstance))
      .filter(({ valid }) => !valid);
  }

  #mutateValueOrUseCache<K extends object>(
    key: $.Keys<K>,
    mutationParent: K,
    mutationValue: K[$.Keys<K>],
    cacheParent: K | undefined
  ) {
    const cacheValue = cacheParent?.[key];
    const isNoChange = deepEquals(mutationValue, cacheValue);
    mutationParent[key] = isNoChange ? (cacheValue as any) : mutationValue;
  }

  #mutateErrors<T>(
    key: $.Keys<DetailedErrors<T>>,
    errorsHolder: DetailedErrors<T>,
    errorsValue: any,
    simpleErrorsHolder: Errors<any>,
    simpleErrorsValue: any
  ) {
    this.#mutateValueOrUseCache(
      key,
      errorsHolder,
      errorsValue,
      this.#cache.detailedErrors as any
    );
    this.#mutateValueOrUseCache(
      key,
      simpleErrorsHolder,
      simpleErrorsValue,
      this.#cache.errors as any
    );
  }

  #fromCache<K extends CacheKey<TClass>>(
    state: Payload<TClass>,
    key: K
  ): EntityProcessorResult<TClass>[K] {
    return this.#tryGetCache(
      state,
      this.#cache[key],
      () => this.validate(state)[key]
    );
  }

  #tryGetCache<K>(
    state: Payload<TClass>,
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
