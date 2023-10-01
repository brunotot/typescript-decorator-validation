import Condition from "../../../../types/namespace/condition.namespace";
import Validation from "../../../../types/namespace/validation.namespace";
import StrategyFactory from "../../factory";

namespace ObjectStrategyType {
  /**
   * Represents the simplified error structure for validating object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `node`: An array of string messages that represent validation errors at the object level.
   * - `children`: An `Errors<F>` object that represents validation errors for each property in the object.
   */
  export type SimpleErrors<F> = {
    node: string[];
    children: StrategyFactory.Impl.Errors<F>;
  };

  /**
   * Represents the detailed error structure for validating object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `node`: An array of `Validation.Result` objects that represent detailed validation errors at the object level.
   * - `children`: A `DetailedErrors<F>` object that represents detailed validation errors for each property in the object.
   */
  export type DetailedErrors<F> = {
    node: Validation.Result[];
    children: StrategyFactory.Impl.DetailedErrors<F>;
  };

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    true extends Condition.isGetter<T, K>
      ? false
  : Condition.isObject<T[K]>;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> = 
    true extends Condition.isUndefined<R> 
      ? T[K] 
  : { node: R; children: R[], host: R[] };
  // TODO: Instead of R[] put rescursive strat evaluation.
}

export default ObjectStrategyType;
