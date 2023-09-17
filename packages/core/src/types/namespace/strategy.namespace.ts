import $ from "..";
import EvaluatedStrategy from "../validation/evaluated-strategy.type";
import Condition from "./condition.namespace";

// prettier-ignore
namespace Strategy {
  export type DeducedArray<TChild, TParent = TChild> = {
    node: TParent;
    children: TChild[];
  }

  export type Function = never;

  export type Primitive<T, R> = true extends Condition.isUndefined<R>
    ? NonNullable<T>
    : R;

  export type Array<T, R, TPartial extends $.Params.valuePartial = "disabled"> = T extends (infer U)[]
    ? true extends Condition.isPrimitive<U>
      ? true extends Condition.isUndefined<R>
        ? T
        : Strategy.DeducedArray<R>
      : true extends Condition.isUndefined<R>
        ? EvaluatedStrategy<U, R, TPartial>[]
        : Strategy.DeducedArray<EvaluatedStrategy<U, R, TPartial>, R>
    : never;

  export type Object<
    T,
    R,
    TPartial extends $.Params.valuePartial = $.Params.partial['disabled']
  > = EvaluatedStrategy<NonNullable<T>, R, TPartial>;
}

export default Strategy;
