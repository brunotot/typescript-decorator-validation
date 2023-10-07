import API from "api";

/**
 * Namespace for Function Strategy Types.
 */
namespace FunctionStrategyType {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = "function" as const;

  /**
   * Type definition for simple errors in this strategy.
   */
  export type SimpleErrors = string | null;

  /**
   * Type definition for detailed errors in this strategy.
   */
  export type DetailedErrors = API.Validation.Result | null;

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> = API.Utilities.Booleans.isFunction<T[K]>

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
  : API.Utilities.Arrays.getArrayType<R> | null;
}

export default FunctionStrategyType;
