import API from "api";
import PrimitiveStrategyType from "../PrimitiveStrategy/types";

namespace PrimitiveArrayGetterStrategyType {
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

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    true extends API.Utilities.Booleans.isGetter<T, K>
      ? API.Utilities.Arrays.getArrayType<T[K]> extends never
        ? false
        : API.Utilities.Booleans.isAnyOf<API.Utilities.Arrays.getArrayType<T[K]>, API.Utilities.Types.Primitive>
      : false;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends API.Utilities.Booleans.isUndefined<R>
      ? T[K]
  : { node: R; children: R[]; };
}

export default PrimitiveArrayGetterStrategyType;
