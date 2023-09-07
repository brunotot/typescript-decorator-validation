import { Condition } from "./namespace/Condition.ns";
import { Strategy } from "./namespace/Strategy.ns";
import { $ } from "./namespace/Utility.ns";

// prettier-ignore
export type FieldStrategy<
  TActual, 
  TKey extends $.Keys<TActual>, TStrat, 
  TPartial extends $.TArg<"partial"> = "disabled"
> =

  true extends Condition.isPrimitive<TActual[TKey]>
    ?Strategy.Primitive<TActual[TKey], TStrat>

  :true extends Condition.isFunction<TActual[TKey]>
    ?Strategy.Function

  :true extends Condition.isArray<TActual[TKey]>
    ?Strategy.Array<TActual[TKey], TStrat, TPartial> 

  :true extends Condition.isObject<TActual[TKey]>
    ?Strategy.Object<TActual[TKey], TStrat, TPartial>

:never;

export type StrategyOptional<
  TActual,
  TPartial extends $.TArg<"partial"> = "disabled"
> = {
  [TKey in $.WritableKeys<TActual>]?: FieldStrategy<
    TActual,
    TKey,
    $._,
    TPartial
  >;
};

export type StrategyMandatory<
  TActual,
  TStrat,
  TPartial extends $.TArg<"partial"> = "disabled"
> = {
  [TKey in $.WritableKeys<TActual>]-?: FieldStrategy<
    TActual,
    TKey,
    TStrat,
    TPartial
  >;
};

// prettier-ignore
export type EvaluatedStrategy<T, V = $._, TPartial extends $.TArg<"partial"> = "disabled"> = true extends Condition.isUndefined<V>
  ? TPartial extends $.TArgGet<"partial">["enabled"] 
    ? Partial<$.ExcludeNever<StrategyOptional<T, TPartial>>> 
    : $.ExcludeNever<StrategyOptional<T, TPartial>>
  : TPartial extends $.TArgGet<"partial">["enabled"] 
    ? Partial<$.ExcludeNever<StrategyMandatory<T, V, TPartial>>> 
    : $.ExcludeNever<StrategyMandatory<T, V, TPartial>>;
