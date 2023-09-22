import $ from "..";
import EvaluatedStrategy from "../validation/evaluated-strategy.type";
import Condition from "./condition.namespace";

/**
 * @namespace Strategy
 *
 * @description
 * A collection of types related to validation strategies.
 */
namespace Strategy {
  /**
   * @typeParam TChild - The type of child elements.
   * @typeParam TParent - The type of the parent node.
   *
   * @type
   *
   * @description
   * Represents a deduced array of child elements with a parent node.
   */
  export type DeducedArray<TChild, TParent = TChild> = {
    node: TParent;
    children: TChild[];
  };

  /**
   * @type
   *
   * @description
   * Currently, there is no documented type under `Strategy.Function`.
   */
  export type Function = never;

  /**
   * @typeParam T - The type of the input data.
   * @typeParam R - The type of the result.
   * @typeParam TPartial - The type of partial parameters.
   *
   * @type
   *
   * @description
   * Represents a primitive type in a validation strategy. The type `T` is
   * considered non-nullable unless `R` is marked as undefined in which case
   * `T` becomes non-nullable.
   */
  export type Primitive<T, R> = true extends Condition.isUndefined<R>
    ? NonNullable<T>
    : R;

  /**
   * @typeParam T - The type of the input data.
   * @typeParam R - The type of the result.
   * @typeParam TPartial - The type of partial parameters.
   *
   * @type
   *
   * @description
   * Represents an array type in a validation strategy. It handles cases where
   * `T` is an array. Depending on the conditions, it can return different
   * types.
   */
  export type Array<
    T,
    R,
    TPartial extends $.Params.valuePartial = "disabled"
  > = T extends (infer U)[]
    ? true extends Condition.isPrimitive<U>
      ? true extends Condition.isUndefined<R>
        ? T
        : Strategy.DeducedArray<R>
      : true extends Condition.isUndefined<R>
      ? EvaluatedStrategy<U, R, TPartial>[]
      : Strategy.DeducedArray<EvaluatedStrategy<U, R, TPartial>, R>
    : never;

  /**
   * @typeParam T - The type of the input data.
   * @typeParam R - The type of the result.
   * @typeParam TPartial - The type of partial parameters.
   *
   * @type
   *
   * @description
   * Represents an object type in a validation strategy. It uses
   * `EvaluatedStrategy` to define the strategy for validating non-nullable
   * objects.
   */
  export type Object<
    T,
    R,
    TPartial extends $.Params.valuePartial = $.Params.partial["disabled"]
  > = EvaluatedStrategy<NonNullable<T>, R, TPartial>;
}

/**
 * @description
 * The default export for the `Strategy` namespace.
 */
export default Strategy;
