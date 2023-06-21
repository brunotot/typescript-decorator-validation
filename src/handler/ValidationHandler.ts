import MetadataKey from "../model/enum/MetadataKey";
import { Class } from "../model/type/class.type";
import { ErrorData } from "../model/type/error-data.type";
import { ValidationResult } from "../model/type/validation-result.type";
import ReflectService from "../service/ReflectService";
import {
  deepEquals,
  isValidationGroupUnion,
} from "../model/utility/object.utility";
import { ValidationClass } from "../model/type/validation-class.type";
import InferredType from "../model/enum/InferredType";
import { KeyOf, OmitNever } from "../model/utility/type.utility";
import PropertyMetadata from "../service/PropertyMetadata";
import ClassMetadata from "../service/ClassMetadata";

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

function any(any: any): any {
  return any as any;
}

function array(any: any): any[] {
  return any as any[];
}

export default class ValidationHandler<T> {
  private _clazz: Class<T>;
  private _oldState?: ValidationClass<T>;
  private _oldHasErrors?: boolean;
  private _oldErrors?: ErrorData<T>;
  private _groups: ValidationGroupType[];
  private _metadata: ClassMetadata<T>;

  constructor(clazz: Class<T>, ...groups: ValidationGroupType[]) {
    this._clazz = clazz;
    this._groups = Array.from(new Set(groups));
    this._metadata = new ClassMetadata(clazz, ...groups);
  }

  hasErrors(state: ValidationClass<T>): boolean {
    return this._oldHasErrors === undefined ||
      !deepEquals(this._oldState, state)
      ? !this.validate(state).valid
      : this._oldHasErrors;
  }

  getErrors(state: ValidationClass<T>): ErrorData<T> {
    return this._oldErrors === undefined || !deepEquals(this._oldState, state)
      ? this.validate(state).errors
      : this._oldErrors;
  }

  private mutateErrors<T>(
    errors: ErrorData<T>,
    key: KeyOf<ErrorData<T>>,
    newErrors: any
  ): void {
    errors[key] = deepEquals(newErrors, this._oldErrors?.[key])
      ? any(this._oldErrors)?.[key]
      : any(newErrors);
  }

  validate(state: ValidationClass<T>): StateValidationResult<T> {
    let valid: boolean = true;
    let errors: ErrorData<T> = {} as ErrorData<T>;

    const instance: any = this._metadata.createInstance(state);
    const entries = Object.entries(this._metadata.validators);

    for (const [_key, validators] of entries) {
      const key = _key as keyof ErrorData<T>;
      const meta = new PropertyMetadata<T>(this._clazz, key);
      if (meta.clazz) {
        if (meta.is(InferredType.GENERIC_OBJECT)) {
          const innerValidationHandler = new ValidationHandler(
            meta.clazz,
            ...this._groups
          );
          const validatorEval = innerValidationHandler.validate(
            any(state)[key]
          );
          if (!validatorEval.valid) {
            valid = false;
          }
          this.mutateErrors(errors, key, validatorEval);
          continue;
        } else if (meta.is(InferredType.ARRAY)) {
          const innerValidationHandler = new ValidationHandler(
            meta.clazz,
            ...this._groups
          );
          const stateValueArray: any[] = any(state)[key];

          const parentValidators: any[] = (
            (validators as any).node as ValidationFnMetadata<any>[]
          )
            .map((validator) => validator.validate(stateValueArray, any(state)))
            .filter((evaluation) => {
              if (!evaluation.valid) {
                valid = false;
              }
              return !evaluation.valid;
            });

          const childrenValidators = stateValueArray.map(
            (innerValue: Object) => {
              const validatorEval = innerValidationHandler.validate(innerValue);
              if (!validatorEval.valid) {
                valid = false;
              }
              return validatorEval;
            }
          );

          this.mutateErrors(errors, key, {
            node: parentValidators,
            children: childrenValidators,
          });

          continue;
        }
      }

      if (meta.is(InferredType.ARRAY)) {
        const arrayValidators = ReflectService.getMetadata<
          ValidationFnMetadata<any>
        >(MetadataKey.VALIDATOR_EACH_IN_ARRAY, this._clazz, _key).filter((e) =>
          isValidationGroupUnion(this._groups, e.groups)
        );

        const stateValueArray = array(any(state)[key]);
        const parentValidators = (validators as ValidationFnMetadata<any>[])
          .map((validator) => {
            return validator.validate(stateValueArray, any(state));
          })
          .filter((evaluation) => {
            if (!evaluation.valid) {
              valid = false;
            }
            return !evaluation.valid;
          });

        const childrenValidators = stateValueArray.map((v: any) =>
          arrayValidators
            .map((validator) => validator.validate(v, any(state)))
            .filter((evaluation) => {
              if (!evaluation.valid) {
                valid = false;
              }
              return !evaluation.valid;
            })
        );

        this.mutateErrors(errors, key, {
          node: parentValidators,
          children: childrenValidators,
        });

        continue;
      }

      const newFieldErrors = (validators as ValidationFnMetadata<T>[])
        .filter((validator) =>
          isValidationGroupUnion(this._groups, validator.groups)
        )
        .map((validator) => validator.validate(instance[key], instance))
        .filter((evaluation) => !evaluation.valid);

      if (newFieldErrors.length > 0) {
        valid = false;
      }

      this.mutateErrors(errors, key, newFieldErrors);
    }

    this._oldState = state;
    this._oldHasErrors = !valid;
    this._oldErrors = errors;

    return {
      valid,
      errors,
    };
  }
}
