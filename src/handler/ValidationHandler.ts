import { Class } from "../model/type/Class.type";
import { ErrorData } from "../model/type/ErrorData.type";
import { ValidationResult } from "../model/type/ValidationResult.type";
import { ValidationClass } from "../model/type/ValidationClass.type";
import { KeyOf, EvaluatedStrategy } from "../model/utility/type.utility";
import { DeducedArray } from "../model/type/namespace/Strategy.ns";
import PropertyMetadata from "../model/const/PropertyMetadata";
import ClassMetadata from "../model/const/ClassMetadata";
import {
  deepEquals,
  isValidationGroupUnion,
} from "../model/utility/object.utility";
import { time } from "../model/utility/decorator.utility";
import MetadataProcessor from "../processor/MetadataProcessor";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export type ValidationGroupType = string | number;
export type SimpleErrorData<T> = EvaluatedStrategy<T, string[]>;
export type ValidationFn<T> = (value: T, context?: any) => ValidationResult;

export type ValidationFnMetadata<T> = {
  groups: ValidationGroupType[];
  validate: ValidationFn<T>;
};

export type StateValidationResult<T> = {
  valid: boolean;
  errors: ErrorData<T>;
};

export type ValidationHandlerStateType<T> = {
  valid: boolean;
  errors: ErrorData<T>;
  state: ValidationClass<T>;
  simpleErrors: SimpleErrorData<T>;
};

export type StateValidationResultGroup<T> = {
  valid: boolean;
  detailedErrors: ErrorData<T>;
  errors: SimpleErrorData<T>;
};

export type ValidityErrorsType =
  | StateValidationResult<any>
  | StateValidationResult<any>[]
  | ValidationResult[]
  | ValidationResult[][];

export type ValidationHandlerCache<T> = Partial<{
  state: ValidationClass<T>;
  hasErrors: boolean;
  detailedErrors: ErrorData<T>;
  errors: SimpleErrorData<T>;
}>;

export default class ValidationHandler<T> {
  private _clazz: Class<T>;
  private _groups: ValidationGroupType[];
  private _metadata!: ClassMetadata<T>;
  private _cache: ValidationHandlerCache<T>;

  constructor(clazz: Class<T>, ...groups: ValidationGroupType[]) {
    this._clazz = clazz;
    this._groups = Array.from(new Set(groups));
    //this._metadata = new ClassMetadata(clazz, ...groups);
    this._cache = {};
  }

  hasErrors(state: ValidationClass<T>): boolean {
    return this.tryGetCache(
      state,
      !!this._cache.hasErrors,
      () => !this.validate(state).detailedErrors
    );
  }

  getDetailedErrors(state: ValidationClass<T>): ErrorData<T> {
    return this.tryGetCache(
      state,
      this._cache.detailedErrors!,
      () => this.validate(state).detailedErrors
    );
  }

  getErrors(state: ValidationClass<T>): SimpleErrorData<T> {
    return this.tryGetCache(
      state,
      this._cache.errors!,
      () => this.validate(state).errors
    );
  }

  @time
  validate(state0?: ValidationClass<T>): StateValidationResultGroup<T> {
    let valid: boolean = true;
    let errors: ErrorData<T> = {} as ErrorData<T>;
    const state: ValidationClass<T> = state0 ?? ({} as ValidationClass<T>);
    let simpleErrors: SimpleErrorData<T> = {} as SimpleErrorData<T>;

    if (!this._metadata) {
      this._metadata = new ClassMetadata(
        this._clazz,
        state as T,
        ...this._groups
      );
    }

    const instance: any = this._metadata.createInstance(state);
    const entries = Object.entries(this._metadata.validators);

    // prettier-ignore
    type ErrorDataApplierType<K = undefined> = (key: keyof ErrorData<T>, meta: PropertyMetadata<T>, validators: K) => void;

    // prettier-ignore
    const collectErrorData = (key: KeyOf<ErrorData<T>>, parentData: any, newSimpleErrorsValue: any, childData?: any) => {
      if (Array.isArray(childData)) {
        valid = this.recalculateValidity(parentData, valid);
        valid = this.recalculateValidity(childData, valid);
        const data = { node: parentData, children: childData };

        this.mutateErrors(
          key,
          errors,
          data,
          (simpleErrors as any),
          newSimpleErrorsValue
        );
      } else {
        valid = this.recalculateValidity(parentData, valid);

        this.mutateErrors(
          key,
          errors,
          parentData,
          (simpleErrors as any),
          newSimpleErrorsValue
        );
      }
    };

    // prettier-ignore
    const handlePrimitive: ErrorDataApplierType<ValidationFnMetadata<any>[]> = (key, _, validators) => {
      const primitiveErrors = this.extractInvalidResults(
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
    const handlePrimitiveArray: ErrorDataApplierType<ValidationFnMetadata<any>[]> = (key) => {
      const stateValueArray = ((state as any)[key] as any[]);

      const prop = MetadataProcessor.fromClass(this._clazz).getValidationProcessor(key as string)
      const primitiveArrayValidators = prop.node;

      const parentValidators = this.extractInvalidResults(
        prop.node as any,
        stateValueArray,
        state
      );

      const childrenValidators = (stateValueArray ?? []).map((v: any) =>
        this.extractInvalidResults(primitiveArrayValidators, v, state)
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
      const innerValidationHandler = new ValidationHandler(
        meta.clazz!,
        ...this._groups
      );
      const { detailedErrors, errors } = innerValidationHandler.validate(
        (state as any)[key]
      );
      collectErrorData(key, detailedErrors, errors);
    };

    // prettier-ignore
    const handleObjectArray: ErrorDataApplierType<DeducedArray<ValidationFnMetadata<any>[]>> = (key, meta, validators) => {
      const innerValidationHandler = new ValidationHandler(
        meta.clazz!,
        ...this._groups
      );
      const stateValueArray: any[] = (((state as any)?.[key] ?? [])as any[]);

      const parentValidators = this.extractInvalidResults(
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
      const key = _key as keyof ErrorData<T>;
      const meta = new PropertyMetadata<T>(
        this._clazz,
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

    this.saveCache({
      detailedErrors: errors,
      errors: simpleErrors,
      hasErrors: !valid,
      state,
    });

    return {
      valid,
      detailedErrors: errors,
      errors: simpleErrors,
    };
  }

  private saveCache(cache: ValidationHandlerCache<T>): void {
    Object.entries(cache).forEach(([key, value]) => {
      (this._cache as any)[key] = value;
    });
  }

  private extractInvalidResults<T>(
    validators: ValidationFnMetadata<T>[],
    value: T,
    parentInstance: any
  ) {
    return validators
      .filter(({ groups }) => isValidationGroupUnion(this._groups, groups))
      .map(({ validate }) => validate(value, parentInstance))
      .filter(({ valid }) => !valid);
  }

  private mutateValueOrUseCache<K extends object>(
    key: KeyOf<K>,
    mutationParent: K,
    mutationValue: K[KeyOf<K>],
    cacheParent: K | undefined
  ) {
    const cacheValue = cacheParent?.[key];
    const isNoChange = deepEquals(mutationValue, cacheValue);
    mutationParent[key] = isNoChange ? (cacheValue as any) : mutationValue;
  }

  private mutateErrors<T>(
    key: KeyOf<ErrorData<T>>,
    errorsHolder: ErrorData<T>,
    errorsValue: any,
    simpleErrorsHolder: SimpleErrorData<any>,
    simpleErrorsValue: any
  ) {
    this.mutateValueOrUseCache(
      key,
      errorsHolder,
      errorsValue,
      this._cache.detailedErrors as any
    );
    this.mutateValueOrUseCache(
      key,
      simpleErrorsHolder,
      simpleErrorsValue,
      this._cache.errors as any
    );
  }

  private tryGetCache<K>(
    state: ValidationClass<T>,
    cacheValue: K,
    valueGetter: () => K
  ): K {
    return cacheValue === undefined || !deepEquals(this._cache.state, state)
      ? valueGetter()
      : cacheValue;
  }

  // prettier-ignore
  private recalculateValidity(errs: ValidityErrorsType, current: boolean) {
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
