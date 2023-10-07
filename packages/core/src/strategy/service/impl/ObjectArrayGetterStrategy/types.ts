import API from "api";

import StrategyFactory from "../../../models/StrategyFactory";
import ObjectStrategyType from "../ObjectStrategy/types";

namespace ObjectArrayGetterStrategyType {
  export const Name = `() => ${ObjectStrategyType.Name}[]` as const;

  /**
   * Represents the simplified error structure for validating arrays of object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `field`: An array of string messages that represent validation errors at the array level.
   * - `data`: An array of `Errors<F>` objects that represent validation errors for each object in the array.
   */
  export type SimpleErrors<F> = {
    root: string[];
    data: StrategyFactory.Impl.Errors<F>[];
  };

  /**
   * Represents the detailed error structure for validating arrays of object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `field`: An array of `Validation.Result` objects that represent detailed validation errors at the array level.
   * - `data`: An array of `DetailedErrors<F>` objects that represent detailed validation errors for each object in the array.
   */
  export type DetailedErrors<F> = {
    root: API.Validation.Result[];
    data: StrategyFactory.Impl.DetailedErrors<F>[];
  };

  // prettier-ignore
  export type matches<T, K extends keyof T> =
    true extends API.Utilities.Booleans.isGetter<T, K>
      ? API.Utilities.Arrays.getArrayType<NonNullable<T[K]>> extends never
        ? false
        : API.Utilities.Booleans.isObject<API.Utilities.Arrays.getArrayType<NonNullable<T[K]>>>
      : false;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> = ObjectStrategyType.handler<T, K, R>[]
}

export default ObjectArrayGetterStrategyType;
