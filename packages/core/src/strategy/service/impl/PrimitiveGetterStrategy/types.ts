import type API from "../../../../../index";
import PrimitiveStrategyType from "../PrimitiveStrategy/types";

/**
 * Namespace for PrimitiveGetter Strategy Types.
 */
namespace PrimitiveGetterStrategyType {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = `get (): ${PrimitiveStrategyType.Name}` as const;

  /**
   * Represents the simplified error structure for validating getter methods that return primitive types.
   */
  export type SimpleErrors = string[];

  /**
   * Represents the detailed error structure for validating getter methods that return primitive types.
   */
  export type DetailedErrors = API.Validation.Result[];

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> =
    true extends API.Utilities.Booleans.isGetter<T, K>
      ? API.Utilities.Booleans.isAnyOf<T[K], API.Utilities.Types.Primitive>
      : false;

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

export default PrimitiveGetterStrategyType;
