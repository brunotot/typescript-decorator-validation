import type API from "api";
import type StrategyFactory from "../../../models/StrategyFactory";

/**
 * Namespace for Object Strategy Types.
 */
namespace ObjectStrategyType {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = "composite" as const;

  /**
   * Represents the simplified error structure for validating object types.
   * @typeParam F - The type of the field being validated.
   */
  export type SimpleErrors<F> = {
    /** An array of string messages that represent validation errors at the decorated field level. */
    root: string[];
    /** An object that represents simplified validation errors for each property in the object. */
    data: StrategyFactory.Impl.Errors<F>;
  };

  /**
   * Represents the detailed error structure for validating object types.
   * @typeParam F - The type of the field being validated.
   */
  export type DetailedErrors<F> = {
    /** An array of validation result objects that represent detailed validation errors at the decorated field level. */
    root: API.Validation.Result[];
    /** An object that represents detailed validation errors for each property in the object. */
    data: StrategyFactory.Impl.DetailedErrors<F>;
  };

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> =
    true extends API.Utilities.Booleans.isGetter<T, K>
      ? false
  : API.Utilities.Booleans.isObject<T[K]>;

  /**
   * Type for the handler function based on the field and result types.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   * @typeParam R - The result type.
   */
  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends API.Utilities.Booleans.isUndefined<R>
      ? T[K]
  : { root: R; data: StrategyFactory.evaluate<T[K], R> };
}

export default ObjectStrategyType;
