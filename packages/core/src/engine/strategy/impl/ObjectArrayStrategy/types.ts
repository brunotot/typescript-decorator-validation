import Arrays from "../../../../types/namespace/arrays.namespace";
import Condition from "../../../../types/namespace/condition.namespace";
import Validation from "../../../../types/namespace/validation.namespace";
import StrategyFactory from "../../factory";

namespace ObjectArrayStrategyType {
  export const Name = "composite[]" as const;

  /**
   * Represents the simplified error structure for validating arrays of object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `field`: An array of string messages that represent validation errors at the array level.
   * - `children`: An array of `Errors<F>` objects that represent validation errors for each object in the array.
   */
  export type SimpleErrors<F> = {
    host: string[][];
    node: string[];
    children: StrategyFactory.Impl.Errors<F>[];
  };

  /**
   * Represents the detailed error structure for validating arrays of object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `field`: An array of `Validation.Result` objects that represent detailed validation errors at the array level.
   * - `children`: An array of `DetailedErrors<F>` objects that represent detailed validation errors for each object in the array.
   */
  export type DetailedErrors<F> = {
    host: Validation.Result[][];
    node: Validation.Result[];
    children: StrategyFactory.Impl.DetailedErrors<F>[];
  };

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    Arrays.getArrayType<NonNullable<T[K]>> extends never
      ? false
    : true extends Condition.isGetter<T, K>
      ? false
  : Condition.isObject<Arrays.getArrayType<NonNullable<T[K]>>>;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> = 
    true extends Condition.isUndefined<R> 
      ? T[K] 
  : { node: R[]; children: R[][], host: R[] };
  // TODO: Instead of R[] put rescursive strat evaluation.
}

export default ObjectArrayStrategyType;
