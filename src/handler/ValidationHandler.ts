import MetadataKey from "../model/enum/MetadataKey";
import { Class } from "../model/type/class.type";
import { ErrorData } from "../model/type/error-data.type";
import { ValidationResult } from "../model/type/validation-result.type";
import ReflectService from "../service/ReflectService";
import { deepEquals } from "../model/utility/object.utility";
import { ValidationClass } from "../model/type/validation-class.type";
import InferredType from "../model/enum/InferredType";
import { OmitNever } from "../model/utility/type.utility";

export type ValidationFn<T> = (value: T) => ValidationResult;

//export type ValidationData<T> = Record<keyof T, ValidationFn<T>[]>;

export type StateValidationResult<T> = {
  valid: boolean;
  errors: ErrorData<T>;
};

export type ValidationData<T> = OmitNever<{
  [K in keyof T]: T[K] extends object
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

export default class ValidationHandler<T> {
  private _clazz: Class<T>;
  private _fieldNames: (keyof T)[];
  private _validationData: ValidationData<T>;
  private _oldState?: ValidationClass<T>;
  private _oldHasErrors?: boolean;
  private _oldErrors?: ErrorData<T>;

  constructor(clazz: Class<T>) {
    this._clazz = clazz;
    this._fieldNames = this.buildFieldKeys();
    this._validationData = this.buildValidationData();
  }

  get validationData(): ValidationData<T> {
    return this._validationData;
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

  validate(state: ValidationClass<T>): StateValidationResult<T> {
    let valid: boolean = true;
    let errors: ErrorData<T> = {} as ErrorData<T>;

    const instance: any = this.buildInstance(state);

    const entries = Object.entries(this._validationData);

    for (const [key, validators] of entries) {
      const type = ReflectService.getClassFieldType(instance, key);
      const innerClass = this.getNestedType(key);

      if (innerClass) {
        if (InferredType.GENERIC_OBJECT === type) {
          const innerValidationHandler = new ValidationHandler(innerClass);
          const validatorEval = innerValidationHandler.validate(
            any(state)[key]
          );
          if (!validatorEval.valid) {
            valid = false;
          }
          errors[key as keyof ErrorData<T>] = any({
            ...validatorEval,
          });
          continue;
        } else if (InferredType.ARRAY === type) {
          const innerValidationHandler = new ValidationHandler(innerClass);
          const innerState: any[] = any(state)[key];
          errors[key as keyof ErrorData<T>] = any(
            innerState.map((innerValue: Object) => {
              const validatorEval = innerValidationHandler.validate(innerValue);
              if (!validatorEval.valid) {
                valid = false;
              }
              return validatorEval;
            })
          );
          continue;
        }
      }

      const fieldErrors = (validators as ValidationFn<T>[])
        .map((validator) => validator(instance[key]))
        .filter((evaluation) => !evaluation.valid);

      if (fieldErrors.length > 0) {
        valid = false;
      }

      errors[key as keyof ErrorData<T>] = any(fieldErrors);
    }

    this._oldState = state;
    this._oldHasErrors = !valid;
    this._oldErrors = errors;

    return {
      valid,
      errors,
    };
  }

  buildInstance(state: ValidationClass<T>): T {
    const instance: any = new this._clazz();
    const entries = Object.entries(state);
    for (const [key, value] of entries) {
      const type = ReflectService.getClassFieldType(instance, key);
      const innerClass = this.getNestedType(key);

      if (innerClass) {
        if (InferredType.GENERIC_OBJECT === type) {
          const innerValidationHandler = new ValidationHandler(innerClass);
          instance[key] = innerValidationHandler.buildInstance(value as any);
          continue;
        }
        if (InferredType.ARRAY === type) {
          instance[key] = [];
          const innerValidationHandler = new ValidationHandler(innerClass);
          (value as any[]).forEach((v) => {
            instance[key].push(innerValidationHandler.buildInstance(v));
          });
          continue;
        }
      }

      instance[key] = value;
    }
    return instance as T;
  }

  private getValidationMetadata<T>(property: string): ValidationFn<T>[] {
    return ReflectService.getMetadata(
      MetadataKey.VALIDATOR_FIELD,
      this._clazz,
      property
    );
  }

  private buildFieldKeys(): (keyof T)[] {
    return [
      ...ReflectService.getClassFieldNames(this._clazz),
      ...ReflectService.getClassGetterNames(this._clazz),
    ] as (keyof T)[];
  }

  private buildValidationData<T>(): ValidationData<T> {
    return this._fieldNames.reduce((obj, property) => {
      const innerClass = this.getNestedType(property as string);
      return {
        ...obj,
        [property]: innerClass
          ? new ValidationHandler(innerClass).buildValidationData()
          : this.getValidationMetadata<T>(property as string),
      };
    }, {}) as ValidationData<T>;
  }

  private getNestedType(prop: string): Class<unknown> | null {
    return (
      ReflectService.getMetadata<Class<any>>(
        MetadataKey.SEMANTICS_VALID,
        this._clazz,
        prop
      )[0] || null
    );
  }
}
