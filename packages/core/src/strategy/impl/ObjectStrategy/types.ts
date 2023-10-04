import Validation from "../../../engine";
import Booleans from "../../../utilities/impl/Booleans";
import StrategyFactory from "../../factory";

namespace ObjectStrategyType {
  export const Name = "composite" as const;

  /**
   * Represents the simplified error structure for validating object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `root`: An array of string messages that represent validation errors at the object level.
   * - `data`: An `Errors<F>` object that represents validation errors for each property in the object.
   */
  export type SimpleErrors<F> = {
    root: string[];
    data: StrategyFactory.Impl.Errors<F>;
  };

  /**
   * Represents the detailed error structure for validating object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `root`: An array of `Validation.Result` objects that represent detailed validation errors at the object level.
   * - `data`: A `DetailedErrors<F>` object that represents detailed validation errors for each property in the object.
   */
  export type DetailedErrors<F> = {
    root: Validation.Result[];
    data: StrategyFactory.Impl.DetailedErrors<F>;
  };

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    true extends Booleans.isGetter<T, K>
      ? false
  : Booleans.isObject<T[K]>;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> = 
    true extends Booleans.isUndefined<R> 
      ? T[K] 
  : { root: R; data: StrategyFactory.evaluate<T[K], R> };
}

export default ObjectStrategyType;
