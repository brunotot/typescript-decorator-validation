import $ from "..";
import Condition from "../namespace/condition.namespace";
import Strategy from "../namespace/strategy.namespace";

/**
 * @typeParam T - The type to be evaluated.
 * @typeParam V - The type representing values for optional fields.
 * @typeParam TPartial - The type representing partial values for optional fields.
 *
 * @type
 *
 * @description
 * Represents an evaluated strategy for handling validation or processing of a value of type `T`.
 * This type is used to define how validation or processing should be applied to a specific type `T`.
 */
// prettier-ignore
type EvaluatedStrategy<T, V = undefined, TPartial extends $.Params.valuePartial = $.Params.partial['disabled']> = 
  true extends Condition.isUndefined<V>
    ? TPartial extends $.Params.partial["enabled"]
      ? Partial<$.Helper.Purify<StrategyOptional<T, TPartial>>>
      : $.Helper.Purify<StrategyOptional<T, TPartial>>
    : TPartial extends $.Params.partial["enabled"]
      ? Partial<$.Helper.Purify<StrategyMandatory<T, V, TPartial>>>
      : $.Helper.Purify<StrategyMandatory<T, V, TPartial>>;

/**
 * @typeParam TActual - The type to be evaluated.
 * @typeParam TKey - The key representing the field to be evaluated.
 * @typeParam TStrat - The strategy to be applied to the field.
 * @typeParam TPartial - The type representing partial values for optional fields.
 *
 * @type
 *
 * @description
 * Represents a field strategy for handling validation or processing of a specific field in a type `TActual`.
 * This type is used to define how validation or processing should be applied to a specific field in a type `TActual`.
 */
// prettier-ignore
export type FieldStrategy<
  TActual,
  TKey extends keyof TActual,
  TStrat,
  TPartial extends $.Params.valuePartial = $.Params.partial['disabled']
> =

  true extends Condition.isPrimitive<TActual[TKey]>
    ? Strategy.Primitive<TActual[TKey], TStrat>

  : true extends Condition.isFunction<TActual[TKey]>
    ? Strategy.Function

  : true extends Condition.isArray<TActual[TKey]>
    ? Strategy.Array<TActual[TKey], TStrat, TPartial>

  : true extends Condition.isObject<TActual[TKey]>
    ? Strategy.Object<TActual[TKey], TStrat, TPartial>

  : never;

/**
 * @typeParam TActual - The type to be evaluated.
 * @typeParam TPartial - The type representing partial values for optional fields.
 *
 * @type
 *
 * @description
 * Represents a strategy for handling optional fields in a type `TActual`.
 * This type is used to define how validation or processing should be applied to optional fields in a type `TActual`.
 */
// prettier-ignore
export type StrategyOptional<
  TActual,
  TPartial extends $.Params.valuePartial = $.Params.partial['disabled']
> = {
  [TKey in $.Objects.Inputs<TActual>]?: FieldStrategy<TActual, TKey, undefined, TPartial>;
};

/**
 * @typeParam TActual - The type to be evaluated.
 * @typeParam TStrat - The strategy to be applied to mandatory fields.
 * @typeParam TPartial - The type representing partial values for optional fields.
 *
 * @type
 *
 * @description
 * Represents a strategy for handling mandatory fields in a type `TActual`.
 * This type is used to define how validation or processing should be applied to mandatory fields in a type `TActual`.
 */
// prettier-ignore
export type StrategyMandatory<
  TActual,
  TStrat,
  TPartial extends $.Params.valuePartial = $.Params.partial['disabled']
> = {
  [TKey in $.Objects.Inputs<TActual>]-?: FieldStrategy<TActual, TKey, TStrat, TPartial>;
};

export default EvaluatedStrategy;
