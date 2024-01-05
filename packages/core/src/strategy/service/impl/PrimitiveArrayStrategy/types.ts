import type API from "../../../../../index";

/**
 * Namespace for PrimitiveArray Strategy Types.
 */
namespace PrimitiveArrayStrategyType {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = "primitive[]" as const;

  /**
   * Represents the simplified error structure for validating arrays of primitive types.
   *
   * - `root`: An array of string messages that represent validation errors at the array level.
   * - `data`: A two-dimensional array of string messages that represent validation errors for each element in the array.
   */
  export type SimpleErrors = {
    root: string[];
    data: string[][];
  };

  /**
   * Represents the detailed error structure for validating arrays of primitive types.
   *
   * - `root`: An array of `ValidationResult` objects that represent detailed validation errors at the array level.
   * - `data`: A two-dimensional array of `ValidationResult` objects that represent detailed validation errors for each element in the array.
   */
  export type DetailedErrors = {
    root: API.Validation.ValidationResult[];
    data: API.Validation.ValidationResult[][];
  };

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> =
  API.Utilities.Arrays.getArrayType<T[K]> extends never
      ? false
  : API.Utilities.Booleans.isAnyOf<API.Utilities.Arrays.getArrayType<T[K]>, API.Utilities.Types.PrimitiveType>

  /**
   * Type for the handler function based on the field and result types.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   * @typeParam R - The result type.
   */
  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends API.Utilities.Booleans.isUndefined<R>
      ? T[K]
  : { root: R; data: R[]; };
}

export default PrimitiveArrayStrategyType;
