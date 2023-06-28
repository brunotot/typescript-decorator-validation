import MetadataKey from "../model/enum/MetadataKey";
import { Class } from "../model/type/Class.type";
import { ErrorData } from "../model/type/ErrorData.type";
import { ValidationResult } from "../model/type/ValidationResult.type";
import ReflectService from "../service/ReflectService";
import { ValidationClass } from "../model/type/ValidationClass.type";
import PropertyMetadata from "../model/const/PropertyMetadata";
import {
  deepEquals,
  isValidationGroupUnion,
} from "../model/utility/object.utility";
import {
  EndNode,
  KeyOf,
  OmitNever,
  RecursiveComplexType,
} from "../model/utility/type.utility";
import ClassMetadata from "../model/const/ClassMetadata";

export type ValidationFn<T> = (value: T, context?: any) => ValidationResult;

export type ValidationFnMetadata<T> = {
  groups: ValidationGroupType[];
  validate: ValidationFn<T>;
};

export type ValidationGroupType = string | number;

export type StateValidationResult<T> = {
  valid: boolean;
  errors: ErrorData<T>;
};

export type ValidationData<T> = OmitNever<{
  [K in KeyOf<T>]: T[K] extends object
    ? T[K] extends Function
      ? never
      : T[K] extends any[]
      ? T[K][number] extends object | any[]
        ? ValidationData<T[K][number]>[]
        : ValidationFn<T[K]>[][]
      : ValidationData<T[K]>
    : ValidationFn<T[K]>[];
}>;

export type ValidationHandlerStateType<T> = {
  valid: boolean;
  errors: ErrorData<T>;
  state: ValidationClass<T>;
  simpleErrors: SimpleErrorData<T>;
};

export type SimpleErrorData<T> = RecursiveComplexType<T, string[]>;

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
  private _metadata: ClassMetadata<T>;
  private _cache: ValidationHandlerCache<T>;

  constructor(clazz: Class<T>, ...groups: ValidationGroupType[]) {
    this._clazz = clazz;
    this._groups = Array.from(new Set(groups));
    this._metadata = new ClassMetadata(clazz, ...groups);
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

  validate(state: ValidationClass<T>): StateValidationResultGroup<T> {
    let valid: boolean = true;
    let errors: ErrorData<T> = {} as ErrorData<T>;
    let simpleErrors: SimpleErrorData<T> = {} as SimpleErrorData<T>;

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
          simpleErrors,
          newSimpleErrorsValue
        );
      } else {
        valid = this.recalculateValidity(parentData, valid);

        this.mutateErrors(
          key,
          errors,
          parentData,
          simpleErrors,
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
    const handlePrimitiveArray: ErrorDataApplierType<ValidationFnMetadata<any>[]> = (key, _, validators) => {
      const stateValueArray = ((state as any)[key] as any[]);

      const primitiveArrayValidators = ReflectService.getMetadata<ValidationFnMetadata<any>>(
        MetadataKey.VALIDATOR_EACH_IN_ARRAY,
        this._clazz, 
        key as string
      );

      const parentValidators = this.extractInvalidResults(
        validators,
        stateValueArray,
        state
      );

      const childrenValidators = stateValueArray.map((v: any) =>
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
    const handleObjectArray: ErrorDataApplierType<EndNode<ValidationFnMetadata<any>[]>> = (key, meta, validators) => {
      const innerValidationHandler = new ValidationHandler(
        meta.clazz!,
        ...this._groups
      );
      const stateValueArray: any[] = ((state as any)[key] as any[]);

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
      const meta = new PropertyMetadata<T>(this._clazz, key);

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
