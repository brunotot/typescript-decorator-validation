import $ from "..";
import Condition from "./condition.namespace";
import EvaluatedStrategyFactory from "./evaluated-strategy-factory.namespace";

/**
 * A collection of types related to field type strategy evaluations.
 */
namespace Strategy {
  /**
   * Represents a deduced array of child elements with a parent node.
   *
   * @typeParam TChild - The type of child elements.
   * @typeParam TParent - The type of the parent node.
   */
  export type DeducedArray<TChild, TParent = TChild> = {
    node: TParent;
    children: TChild[];
  };

  /**
   * Currently, there is no documented type under `Strategy.Function`.
   */
  export type Function = never;

  /**
   * Represents a primitive type in a validation strategy. The type `T` is considered non-nullable unless `R` is marked as undefined in which case `T` becomes non-nullable.
   *
   * @typeParam T - The type of the input data.
   * @typeParam R - The type of the result.
   * @typeParam TPartial - The type of partial parameters.
   */
  export type Primitive<T, R> = true extends Condition.isUndefined<R>
    ? NonNullable<T>
    : R;

  /**
   * Represents an array type in a validation strategy. It handles cases where `T` is an array. Depending on the conditions, it can return different types.
   *
   * @typeParam T - The type of the input data.
   * @typeParam R - The type of the result.
   * @typeParam TPartial - The type of partial parameters.
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
      ? EvaluatedStrategyFactory.Base.EvaluatedStrategy<U, R, TPartial>[]
      : Strategy.DeducedArray<
          EvaluatedStrategyFactory.Base.EvaluatedStrategy<U, R, TPartial>,
          R
        >
    : never;

  /**
   * Represents an object type in a validation strategy. It uses `EvaluatedStrategy` to define the strategy for validating non-nullable objects.
   *
   * @typeParam T - The type of the input data.
   * @typeParam R - The type of the result.
   * @typeParam TPartial - The type of partial parameters.
   */
  export type Object<
    T,
    R,
    TPartial extends $.Params.valuePartial = $.Params.partial["disabled"]
  > = EvaluatedStrategyFactory.Base.EvaluatedStrategy<
    NonNullable<T>,
    R,
    TPartial
  >;
}

export default Strategy;
