import type API from "api";
import PrimitiveStrategyType from "../PrimitiveStrategy/types";

/**
 * Namespace for PrimitiveArrayGetter Strategy Types.
 */
namespace PrimitiveArrayGetterStrategyType {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = `get (): ${PrimitiveStrategyType.Name}[]` as const;

  /**
   * Represents the simplified error structure for validating arrays of primitive types.
   *
   * - `node`: An array of string messages that represent validation errors at the array level.
   * - `children`: A two-dimensional array of string messages that represent validation errors for each element in the array.
   */
  export type SimpleErrors = {
    node: string[];
    children: string[][];
  };

  /**
   * Represents the detailed error structure for validating arrays of primitive types.
   *
   * - `node`: An array of `Validation.Result` objects that represent detailed validation errors at the array level.
   * - `children`: A two-dimensional array of `Validation.Result` objects that represent detailed validation errors for each element in the array.
   */
  export type DetailedErrors = {
    node: API.Validation.Result[];
    children: API.Validation.Result[][];
  };

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> =
    true extends API.Utilities.Booleans.isGetter<T, K>
      ? API.Utilities.Arrays.getArrayType<T[K]> extends never
        ? false
        : API.Utilities.Booleans.isAnyOf<API.Utilities.Arrays.getArrayType<T[K]>, API.Utilities.Types.Primitive>
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
  : { node: R; children: R[]; };
}

export default PrimitiveArrayGetterStrategyType;
