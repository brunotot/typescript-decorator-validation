import type API from "../../../../../index";

/**
 * Namespace for Primitive Strategy Types.
 */
namespace PrimitiveStrategyType {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = "primitive" as const;

  /**
   * Represents the simplified error structure for validating primitive types.
   */
  export type SimpleErrors = string[];

  /**
   * Represents the detailed error structure for validating primitive types.
   */
  export type DetailedErrors = API.Validation.Result[];

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> = API.Utilities.Booleans.isAnyOf<T[K], API.Utilities.Types.Primitive>;

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
  : R;
}

export default PrimitiveStrategyType;
