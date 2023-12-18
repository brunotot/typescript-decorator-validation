import type API from "../../../../../index";
import type StrategyFactory from "../../../models/StrategyFactory";
import ObjectStrategyType from "../ObjectStrategy/types";

/**
 * Namespace for ObjectArrayGetter Strategy Types.
 */
namespace ObjectArrayGetterStrategyType {
  /**
   * Constant name identifier for this strategy.
   */
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
    data: Array<StrategyFactory.Impl.Errors<F>>;
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
    data: Array<StrategyFactory.Impl.DetailedErrors<F>>;
  };

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> =
    true extends API.Utilities.Booleans.isGetter<T, K>
      ? API.Utilities.Arrays.getArrayType<NonNullable<T[K]>> extends never
        ? false
        : API.Utilities.Booleans.isObject<API.Utilities.Arrays.getArrayType<NonNullable<T[K]>>>
      : false;

  /**
   * Type for the handler function based on the field and result types.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   * @typeParam R - The result type.
   */
  // prettier-ignore
  export type handler<T, K extends keyof T, R> = Array<ObjectStrategyType.handler<T, K, R>>
}

export default ObjectArrayGetterStrategyType;
