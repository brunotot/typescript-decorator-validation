import { EvaluatedStrategy } from "../validation/EvaluatedStrategy";
import { Condition } from "./Condition.ns";
import { $ } from "./Utility.ns";

export type DeducedArray<TChild, TParent = TChild> = {
  node: TParent;
  children: TChild[];
};

type _PrimitiveStrategy<TActual, TReplacer> =
  true extends Condition.isUndefined<TReplacer>
    ? NonNullable<TActual>
    : TReplacer;

type _ObjectStrategy<
  TActual,
  TReplacer,
  TPartial extends $.TArg<"partial"> = "disabled"
> = EvaluatedStrategy<NonNullable<TActual>, TReplacer, TPartial>;

// prettier-ignore
type _ArrayStrategy<TActual, TReplacer, TPartial extends $.TArg<"partial"> = "disabled"> = TActual extends (infer U)[]
  ? true extends Condition.isPrimitive<U>
    ? true extends Condition.isUndefined<TReplacer>
      ? TActual
      : DeducedArray<TReplacer>
    : true extends Condition.isUndefined<TReplacer>
      ? EvaluatedStrategy<U, TReplacer, TPartial>[]
      : DeducedArray<EvaluatedStrategy<U, TReplacer, TPartial>, TReplacer>
  : never;

export namespace Strategy {
  export type Function = never;
  export type Primitive<T, R> = _PrimitiveStrategy<T, R>;
  export type Array<
    T,
    R,
    TPartial extends $.TArg<"partial"> = "disabled"
  > = _ArrayStrategy<T, R, TPartial>;
  export type Object<
    T,
    R,
    TPartial extends $.TArg<"partial"> = "disabled"
  > = _ObjectStrategy<T, R, TPartial>;
}
