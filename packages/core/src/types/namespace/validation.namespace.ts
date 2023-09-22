import ObjectArrayStrat from "../../reflection/strategy/impl/object-array.strategy";
import ObjectStrat from "../../reflection/strategy/impl/object.strategy";
import PrimitiveArrayStrat from "../../reflection/strategy/impl/primitive-array.strategy";
import PrimitiveStrat from "../../reflection/strategy/impl/primitive.strategy";
import $ from "../../types/index";

/**
 * @namespace Validation
 *
 * @description
 * A collection of types and functions related to validation.
 */
namespace Validation {
  /**
   * @type
   *
   * @description
   * Represents a validation group, which can be a string, number, or symbol.
   */
  export type Group = string | number | symbol;

  /**
   * @type
   *
   * @description
   * Represents an array of validation groups.
   */
  export type Groups = Validation.Group[];

  /**
   * @type
   *
   * @description
   * Represents a parameter that can accept either a single validation group
   * or an array of validation groups.
   */
  export type GroupsParam = Validation.Group | Validation.Groups;

  /**
   * @typeParam T - The type of the value being evaluated.
   *
   * @type
   *
   * @description
   * Represents a function that evaluates a value and returns a validation
   * result.
   */
  export type Evaluator<T> = (value: T, context?: any) => Validation.Result;

  /**
   * @typeParam T - The type of the value being evaluated.
   *
   * @type
   *
   * @description
   * Represents metadata for a validation rule, including the associated
   * validation groups and the evaluator function.
   */
  export type Metadata<T> = {
    groups: Validation.Group[];
    validate: Validation.Evaluator<T>;
  };

  /**
   * @type
   *
   * @description
   * Represents the result of a validation, including the key, message, and
   * whether it's valid.
   */
  export type Result = {
    key: string;
    message: string;
    valid: boolean;
  };

  /**
   * @typeParam Field - The type of the field being validated.
   *
   * @type
   *
   * @description
   * A type that maps field types to their respective validation strategy
   * classes.
   */
  export type getStrategyClass<Field> =
    true extends $.Condition.isPrimitiveArray<Field>
      ? PrimitiveArrayStrat<Field>
      : true extends $.Condition.isObjectArray<Field>
      ? ObjectArrayStrat<Field>
      : true extends $.Condition.isPrimitive<Field>
      ? PrimitiveStrat<Field>
      : true extends $.Condition.isObject<Field>
      ? ObjectStrat<Field>
      : never;

  /**
   * @typeParam Field - The type of the field being validated.
   *
   * @type
   *
   * @description
   * A type that maps field types to their respective validation strategy
   * results.
   */
  export type getStrategyResult<Field> = ReturnType<
    getStrategyClass<Field>["test"]
  >;

  /**
   * @typeParam T - The type of the value being evaluated.
   *
   * @type
   *
   * @description
   * Represents a builder for creating validation rules with an associated
   * evaluator and optional groups.
   */
  export type Builder<T> = {
    isValid: Validation.Evaluator<T>;
    groups?: Validation.GroupsParam;
  };

  /**
   * @function
   *
   * @description
   * Checks if a single result or an array of results indicates overall
   * validity. Returns `true` if all results are valid, `false` otherwise.
   */
  export function isValid(validations: Result | Result[]): boolean {
    return Array.isArray(validations)
      ? !validations.some(({ valid }) => !valid)
      : validations.valid;
  }

  /**
   * @function
   *
   * @description
   * Extracts simple error messages from an array of validation results.
   */
  export function buildSimpleErrors(validations: Validation.Result[] = []) {
    const nonNullableValidations = validations ?? [];
    return Array.isArray(nonNullableValidations)
      ? nonNullableValidations.map((e) => e.message)
      : [];
  }
}

/**
 * @description
 * The default export for the `Validation` namespace.
 */
export default Validation;
