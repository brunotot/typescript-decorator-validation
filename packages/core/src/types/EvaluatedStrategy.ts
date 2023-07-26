import { Condition } from "./namespace/Condition.ns";
import { Strategy } from "./namespace/Strategy.ns";
import { $ } from "./namespace/Utility.ns";

// prettier-ignore
export type FieldStrategy<TActual, TKey extends $.Keys<TActual>, TStrat> =

  true extends Condition.isPrimitive<TActual[TKey]>
    ?Strategy.Primitive<TActual[TKey], TStrat>

  :true extends Condition.isFunction<TActual[TKey]>
    ?Strategy.Function

  :true extends Condition.isArray<TActual[TKey]>
    ?Strategy.Array<TActual[TKey], TStrat> 

  :true extends Condition.isObject<TActual[TKey]>
    ?Strategy.Object<TActual[TKey], TStrat>

:never;

export type StrategyOptional<TActual> = {
  [TKey in $.WritableKeys<TActual>]?: FieldStrategy<TActual, TKey, $._>;
};

export type StrategyMandatory<TActual, TStrat> = {
  [TKey in $.Keys<TActual>]-?: FieldStrategy<TActual, TKey, TStrat>;
};

// prettier-ignore
export type EvaluatedStrategy<T, V = $._> = true extends Condition.isUndefined<V>
  ? $.ExcludeNever<StrategyOptional<T>>
  : $.ExcludeNever<StrategyMandatory<T, V>>;
