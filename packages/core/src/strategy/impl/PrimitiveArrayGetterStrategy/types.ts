import Validation from "../../../engine";
import Arrays from "../../../utilities/impl/Arrays";
import Booleans from "../../../utilities/impl/Booleans";
import Types from "../../../utilities/impl/Types";

namespace PrimitiveArrayGetterStrategyType {
  export const Name = "primitive[]" as const;

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
    node: Validation.Result[];
    children: Validation.Result[][];
  };

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    true extends Booleans.isGetter<T, K>
      ? Arrays.getArrayType<T[K]> extends never
        ? false
        : Booleans.isAnyOf<Arrays.getArrayType<T[K]>, Types.Primitive>
      : false;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Booleans.isUndefined<R>
      ? T[K]
  : { node: R; children: R[]; };
}

export default PrimitiveArrayGetterStrategyType;
