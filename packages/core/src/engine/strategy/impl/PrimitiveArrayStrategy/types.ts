import Condition from "../../../../types/namespace/condition.namespace";
import Helper from "../../../../types/namespace/helper.namespace";
import Types from "../../../../types/namespace/types.namespace";
import Validation from "../../../../types/namespace/validation.namespace";

namespace PrimitiveArrayStrategyType {
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
    Helper.ExtractArrayType<T[K]> extends never
      ? false
  : Condition.isAnyOf<Helper.ExtractArrayType<T[K]>, Types.Primitive>

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Condition.isUndefined<R>
      ? T[K]
  : { node: R; children: R[]; };
}

export default PrimitiveArrayStrategyType;
