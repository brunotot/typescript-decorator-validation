namespace Validation {
  export type Group = string | number | symbol;

  export type SpreadableGroup = Validation.Group | Validation.Group[];

  export type Evaluator<T> = (value: T, context?: any) => Validation.Result;

  export type Metadata<T> = {
    groups: Validation.Group[];
    validate: Validation.Evaluator<T>;
  };

  export type Result = {
    key: string;
    message: string;
    valid: boolean;
  };

  export type Builder<T> = {
    isValid: Validation.Evaluator<T>;
    groups?: Validation.SpreadableGroup;
  };

  export function buildSimpleErrors(validations: Validation.Result[] = []) {
    const nonNullableValidations = validations ?? [];
    return Array.isArray(nonNullableValidations)
      ? nonNullableValidations.map((e) => e.message)
      : [];
  }
}

export default Validation;
