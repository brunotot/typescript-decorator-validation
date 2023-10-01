import ObjectArrayStrat from "../../engine/strategy/impl/object-array.strategy";
import ObjectStrat from "../../engine/strategy/impl/object.strategy";
import PrimitiveArrayStrat from "../../engine/strategy/impl/primitive-array.strategy";
import PrimitiveStrat from "../../engine/strategy/impl/primitive.strategy";
import Localization from "../../localization";
import $ from "../../types/index";

/**
 * A collection of types and functions related to validation.
 */
namespace Validation {
  /**
   * Represents a validation group, which can be a string, number, or symbol.
   */
  export type Group = string | number | symbol;

  /**
   * Represents an array of validation groups.
   */
  export type Groups = Validation.Group[];

  /**
   * Represents a parameter that can accept either a single validation group or an array of validation groups.
   */
  export type GroupsParam = Validation.Group | Validation.Groups;

  /**
   * Represents a function that evaluates a value and returns a validation result.
   *
   * @typeParam T - The type of the value being evaluated.
   */
  export type Evaluator<T> = ((
    value: T,
    context: any,
    locale: Localization.Locale
  ) => Validation.Result) & {};

  /**
   * Represents metadata for a validation rule, including the associated validation groups and the evaluator function.
   *
   * @typeParam T - The type of the value being evaluated.
   */
  export type Metadata<T> = {
    groups: Validation.Group[];
    validate: Validation.Evaluator<T>;
  };

  /**
   * Represents the result of a validation, including the key, message, and whether it's valid.
   */
  export type Result = {
    key: string;
    message: string;
    valid: boolean;
  };

  /**
   * A type that maps field types to their respective validation strategy classes.
   *
   * @typeParam Field - The type of the field being validated.
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
   * A type that maps field types to their respective validation strategy results.
   *
   * @typeParam Field - The type of the field being validated.
   */
  export type getStrategyResult<Field> = ReturnType<
    getStrategyClass<Field>["test"]
  >;

  /**
   * Represents a builder for creating validation rules with an associated evaluator and optional groups.
   *
   * @typeParam T - The type of the value being evaluated.
   */
  export type Builder<T> = {
    isValid: Validation.Evaluator<T>;
    groups?: Validation.GroupsParam;
  };

  /**
   * Checks if a single result or an array of results indicates overall validity. Returns `true` if all results are valid, `false` otherwise.
   */
  export function isValid(validations: Result | Result[]): boolean {
    return Array.isArray(validations)
      ? !validations.some(({ valid }) => !valid)
      : validations.valid;
  }

  /**
   * Extracts simple error messages from an array of validation results.
   */
  export function buildSimpleErrors(validations: Validation.Result[] = []) {
    const nonNullableValidations = validations ?? [];
    return Array.isArray(nonNullableValidations)
      ? nonNullableValidations.map((e) => e.message)
      : [];
  }

  /**
   * Evaluates the validity of a nullable value.
   *
   * @typeParam T - The type of the value being validated.
   *
   * @param object - The value to validate.
   * @param isValid - A function that performs the actual validation logic.
   *
   * @returns `true` if the value is null or undefined, or the result of `isValid` otherwise.
   */
  export function isValidNullable<T>(
    nullableValue: T,
    isValid: (nonNullableValue: NonNullable<T>) => boolean
  ) {
    return (
      !$.Objects.hasValue(nullableValue) ||
      isValid(nullableValue as NonNullable<T>)
    );
  }
}

export default Validation;
