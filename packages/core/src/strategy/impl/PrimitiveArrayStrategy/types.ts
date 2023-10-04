import Validation from "../../../engine";
import Arrays from "../../../utilities/impl/Arrays";
import Booleans from "../../../utilities/impl/Booleans";
import Types from "../../../utilities/impl/Types";

namespace PrimitiveArrayStrategyType {
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
   * - `root`: An array of `Validation.Result` objects that represent detailed validation errors at the array level.
   * - `data`: A two-dimensional array of `Validation.Result` objects that represent detailed validation errors for each element in the array.
   */
  export type DetailedErrors = {
    root: Validation.Result[];
    data: Validation.Result[][];
  };

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    Arrays.getArrayType<T[K]> extends never
      ? false
  : Booleans.isAnyOf<Arrays.getArrayType<T[K]>, Types.Primitive>

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Booleans.isUndefined<R>
      ? T[K]
  : { root: R; data: R[]; };
}

export default PrimitiveArrayStrategyType;
