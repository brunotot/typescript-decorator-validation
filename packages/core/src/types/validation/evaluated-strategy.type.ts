import $ from "..";
import Condition from "../namespace/condition.namespace";
import Strategy from "../namespace/strategy.namespace";

// prettier-ignore
export type FieldStrategy<
  TActual, 
  TKey extends keyof TActual, TStrat, 
  TPartial extends $.Params.valuePartial = $.Params.partial['disabled']
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

// prettier-ignore
export type StrategyOptional<
  TActual,
  TPartial extends $.Params.valuePartial = $.Params.partial['disabled']
> = {
  [TKey in $.Objects.Inputs<TActual>]?: FieldStrategy<TActual, TKey, undefined, TPartial>;
};

// prettier-ignore
export type StrategyMandatory<
  TActual,
  TStrat,
  TPartial extends $.Params.valuePartial = $.Params.partial['disabled']
> = {
  [TKey in $.Objects.Inputs<TActual>]-?: FieldStrategy<TActual, TKey, TStrat, TPartial>;
};

// prettier-ignore
type EvaluatedStrategy<T, V = undefined, TPartial extends $.Params.valuePartial = $.Params.partial['disabled']> = true extends Condition.isUndefined<V>
  ? TPartial extends $.Params.partial["enabled"] 
    ? Partial<$.Helper.Purify<StrategyOptional<T, TPartial>>> 
    : $.Helper.Purify<StrategyOptional<T, TPartial>>
  : TPartial extends $.Params.partial["enabled"] 
    ? Partial<$.Helper.Purify<StrategyMandatory<T, V, TPartial>>> 
    : $.Helper.Purify<StrategyMandatory<T, V, TPartial>>;

export default EvaluatedStrategy;
