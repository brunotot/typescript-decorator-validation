import { EvaluatedStrategy } from "../EvaluatedStrategy";
import { Condition } from "./Condition.ns";

export type DeducedArray<TChild, TParent = TChild> = {
  node: TParent;
  children: TChild[];
};

type _PrimitiveStrategy<TActual, TReplacer> =
  true extends Condition.isUndefined<TReplacer>
    ? NonNullable<TActual>
    : TReplacer;

type _ObjectStrategy<TActual, TReplacer> = EvaluatedStrategy<
  NonNullable<TActual>,
  TReplacer
>;

// prettier-ignore
type _ArrayStrategy<TActual, TReplacer> = TActual extends (infer U)[]
  ? true extends Condition.isPrimitive<U>
    ? true extends Condition.isUndefined<TReplacer>
      ? TActual
      : DeducedArray<TReplacer>
    : true extends Condition.isUndefined<TReplacer>
      ? EvaluatedStrategy<U, TReplacer>[]
      : DeducedArray<EvaluatedStrategy<U, TReplacer>, TReplacer>
  : never;

export namespace Strategy {
  export type Function = never;
  export type Primitive<T, R> = _PrimitiveStrategy<T, R>;
  export type Object<T, R> = _ObjectStrategy<T, R>;
  export type Array<T, R> = _ArrayStrategy<T, R>;
}
