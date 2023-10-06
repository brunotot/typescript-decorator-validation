import API from "api";

import StrategyFactory from "../../factory";
import ObjectStrategyType from "../ObjectStrategy/types";

namespace ObjectGetterStrategyType {
  export const Name = `(): ${ObjectStrategyType.Name}` as const;

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
    root: API.Validation.Result[];
    data: StrategyFactory.Impl.DetailedErrors<F>;
  };

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    true extends API.Utilities.Booleans.isGetter<T, K>
      ? API.Utilities.Booleans.isObject<T[K]>
      : false

  // prettier-ignore
  export type handler<T, K extends keyof T, R> = 
    true extends API.Utilities.Booleans.isUndefined<R> 
      ? T[K] 
  : { root: R; data: StrategyFactory.evaluate<T[K], R> };
}

export default ObjectGetterStrategyType;
