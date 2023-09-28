import $ from "./../";
import Condition from "./condition.namespace";
import Strategy from "./strategy.namespace";
import Validation from "./validation.namespace";

/**
 * A namespace which exposes all type implementations of `EvaluatedStrategy`
 */
namespace EvaluatedStrategyFactory {
  /**
   * A namespace which holds the base abstract data for evaluation strategy
   */
  export namespace Base {
    /**
     * Represents an evaluated strategy for handling validation or processing of a value of type `T`. This type is used to define how validation or processing should be applied to a specific type `T`.
     *
     * @typeParam T - The type to be evaluated.
     * @typeParam V - The type representing values for optional fields.
     * @typeParam TPartial - The type representing partial values for optional fields.
     */
    // prettier-ignore
    export type EvaluatedStrategy<T, V = undefined, TPartial extends $.Params.valuePartial = $.Params.partial['disabled']> = 
        true extends Condition.isUndefined<V>
        ? TPartial extends $.Params.partial["enabled"]
            ? Partial<$.Helper.Purify<StrategyOptional<T, TPartial>>>
            : $.Helper.Purify<StrategyOptional<T, TPartial>>
        : TPartial extends $.Params.partial["enabled"]
            ? Partial<$.Helper.Purify<StrategyMandatory<T, V, TPartial>>>
            : $.Helper.Purify<StrategyMandatory<T, V, TPartial>>;

    /**
     * Represents a field strategy for handling validation or processing of a specific field in a type `TActual`. This type is used to define how validation or processing should be applied to a specific field in a type `TActual`.
     *
     * @typeParam TActual - The type to be evaluated.
     * @typeParam TKey - The key representing the field to be evaluated.
     * @typeParam TStrat - The strategy to be applied to the field.
     * @typeParam TPartial - The type representing partial values for optional fields.
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
     * Represents a strategy for handling optional fields in a type `TActual`. This type is used to define how validation or processing should be applied to optional fields in a type `TActual`.
     *
     * @typeParam TActual - The type to be evaluated.
     * @typeParam TPartial - The type representing partial values for optional fields.
     */
    // prettier-ignore
    export type StrategyOptional<
        TActual,
        TPartial extends $.Params.valuePartial = $.Params.partial['disabled']
    > = {
        [TKey in $.Objects.Inputs<TActual>]?: FieldStrategy<TActual, TKey, undefined, TPartial>;
    };

    /**
     * Represents a strategy for handling mandatory fields in a type `TActual`. This type is used to define how validation or processing should be applied to mandatory fields in a type `TActual`.
     *
     * @typeParam TActual - The type to be evaluated.
     * @typeParam TStrat - The strategy to be applied to mandatory fields.
     * @typeParam TPartial - The type representing partial values for optional fields.
     */
    // prettier-ignore
    export type StrategyMandatory<
        TActual,
        TStrat,
        TPartial extends $.Params.valuePartial = $.Params.partial['disabled']
    > = {
        [TKey in $.Objects.Inputs<TActual>]-?: FieldStrategy<TActual, TKey, TStrat, TPartial>;
    };
  }

  /**
   * Represents detailed errors for validation results when calling `validate` or `validateField` method of `EntityProcessor` instance.
   *
   * @typeParam T - The type of the value being evaluated.
   *
   * @remarks
   * Represents detailed validation errors for a value of type `T`. This type is used in conjunction with the `EvaluatedStrategy` to provide detailed validation results.
   */
  export type DetailedErrors<T> = Base.EvaluatedStrategy<
    T,
    Validation.Result[],
    $.Params.partial["enabled"]
  >;

  /**
   * Represents simple errors for validation results when calling `validate`
   * or `validateField` method of `EntityProcessor` instance.
   *
   * @typeParam T - The type of the value being evaluated.
   *
   * @remarks
   * Represents validation errors for a value of type `T`. This type is used in
   * conjunction with the `EvaluatedStrategy` to provide validation results as
   * an array of error messages.
   */
  export type Errors<T> = Base.EvaluatedStrategy<
    T,
    string[],
    $.Params.partial["enabled"]
  >;

  /**
   * Represents a payload of type `T` with an evaluated strategy for handling optional fields. This type is used to define how validation or processing should be applied to a payload of type `T`.
   *
   *
   * @typeParam T - The type of payload to be evaluated.
   * @typeParam TPartial - The type representing partial values for optional fields.
   */
  export type Payload<
    T,
    TPartial extends $.Params.valuePartial = $.Params.partial["enabled"]
  > = Base.EvaluatedStrategy<T, undefined, TPartial>;
}

export default EvaluatedStrategyFactory;
