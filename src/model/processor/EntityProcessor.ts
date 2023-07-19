import stopwatch from "../../decorators/impl/stopwatch.decorator";
import PropertyMetadata from "../metadata/PropertyMetadata";
import ClassMetadata from "../metadata/ClassMetadata";
import MetadataProcessor from "./MetadataProcessor";

import { Class } from "../../types/Class.type";
import { DetailedErrors } from "../../types/DetailedErrors.type";
import { ValidationResult } from "../../types/ValidationResult.type";
import { Payload } from "../../types/Payload.type";
import { DeducedArray } from "../../types/namespace/Strategy.ns";
import { deepEquals } from "../../utils/object.utils";
import { $ } from "../../types/namespace/Utility.ns";
import { Errors } from "../../types/Errors.type";
import { ValidationGroup } from "../../decorators/types/DecoratorProps.type";
import { ValidationMetadata } from "../../types/ValidationMetadata.type";
import {
  CacheKey,
  EntityProcessorCache,
  EntityProcessorResult,
  ValidityErrorsType,
} from "../../types/EntityProcessor.type";
import { isValidationGroupUnion } from "../../utils/decorator.utils";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export default class EntityProcessor<T> {
  #clazz: Class<T>;
  #groups: ValidationGroup[];
  #metadata!: ClassMetadata<T>;
  #cache: EntityProcessorCache<T>;

  constructor(clazz: Class<T>, ...groups: ValidationGroup[]) {
    this.#clazz = clazz;
    this.#groups = Array.from(new Set(groups));
    this.#cache = {} as EntityProcessorCache<T>;
  }

  public isValid(state: Payload<T>): boolean {
    return this.#fromCache(state, "valid");
  }

  public getDetailedErrors(state: Payload<T>): DetailedErrors<T> {
    return this.#fromCache(state, "detailedErrors");
  }

  public getErrors(state: Payload<T>): Errors<T> {
    return this.#fromCache(state, "errors");
  }

  @stopwatch
  public validate(payload?: Payload<T>): EntityProcessorResult<T> {
    let valid: boolean = true;
    let detailedErrors: DetailedErrors<T> = {} as DetailedErrors<T>;
    let errors: Errors<T> = {} as Errors<T>;
    const state: Payload<T> = payload ?? ({} as Payload<T>);

    if (!this.#metadata) {
      this.#metadata = new ClassMetadata(
        this.#clazz,
        state as T,
        ...this.#groups
      );
    }

    const instance: any = this.#metadata.createInstance(state);
    const entries = Object.entries(this.#metadata.validators);

    // prettier-ignore
    type ErrorDataApplierType<K = undefined> = (key: keyof DetailedErrors<T>, meta: PropertyMetadata<T>, validators: K) => void;

    // prettier-ignore
    const collectErrorData = (key: $.Keys<DetailedErrors<T>>, parentData: any, newSimpleErrorsValue: any, childData?: any) => {
      if (Array.isArray(childData)) {
        valid = this.#recalculateValidity(parentData, valid);
        valid = this.#recalculateValidity(childData, valid);
        const data = { node: parentData, children: childData };

        this.#mutateErrors(
          key,
          detailedErrors,
          data,
          (errors as any),
          newSimpleErrorsValue
        );
      } else {
        valid = this.#recalculateValidity(parentData, valid);

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

      const parentValidators = this.#extractInvalidResults(
        prop.node as any,
        stateValueArray,
        state
      );

      const childrenValidators = (stateValueArray ?? []).map((v: any) =>
        this.#extractInvalidResults(primitiveArrayValidators, v, state)
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
        ...this.#groups
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
        ...this.#groups
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
      const key = _key as keyof DetailedErrors<T>;
      const meta = new PropertyMetadata<T>(
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

  #saveCache(cache: Partial<EntityProcessorCache<T>>) {
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

  #fromCache<K extends CacheKey<T>>(
    state: Payload<T>,
    key: K
  ): EntityProcessorResult<T>[K] {
    return this.#tryGetCache(
      state,
      this.#cache[key],
      () => this.validate(state)[key]
    );
  }

  #tryGetCache<K>(state: Payload<T>, cacheValue: K, valueGetter: () => K): K {
    return cacheValue === undefined || !deepEquals(this.#cache.state, state)
      ? valueGetter()
      : cacheValue;
  }

  // prettier-ignore
  #recalculateValidity(errs: ValidityErrorsType, current: boolean) {
    return current !== undefined && !current 
      ? false 
      : "errors" in errs
        ? !errs.valid 
          ? false
          : current
        : !errs.length 
          ? current
          : Array.isArray(errs[0])
            ? errs.some((s) => !!(s as ValidationResult[]).length)
              ? false
              : current
            : "errors" in errs[0]
              ? !!errs.length
                  ? false
                  : current
              : false;
  }
}