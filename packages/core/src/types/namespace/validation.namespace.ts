import FunctionStrat from "../../engine/strategy/impl/FunctionStrategy";
import ObjectArrayGetterStrategy from "../../engine/strategy/impl/ObjectArrayGetterStrategy";
import ObjectArrayStrat from "../../engine/strategy/impl/ObjectArrayStrategy";
import ObjectGetterStrat from "../../engine/strategy/impl/ObjectGetterStrategy";
import ObjectStrat from "../../engine/strategy/impl/ObjectStrategy";
import PrimitiveArrayGetterStrat from "../../engine/strategy/impl/PrimitiveArrayGetterStrategy";
import PrimitiveArrayStrat from "../../engine/strategy/impl/PrimitiveArrayStrategy";
import PrimitiveGetterStrat from "../../engine/strategy/impl/PrimitiveGetterStrategy";
import PrimitiveStrat from "../../engine/strategy/impl/PrimitiveStrategy";
import StrategyTypes from "../../engine/strategy/types";
import Localization from "../../localization";

/**
 * A collection of types and functions related to validation.
 */
namespace Validation {
  /**
   * Represents a function that evaluates a value and returns a validation result.
   *
   * @typeParam T - The type of the value being evaluated.
   */
  export type Evaluator<T> = ((
    value: T,
    context: any,
    locale: Localization.Locale
  ) => Result) & {};

  /**
   * Represents metadata for a validation rule, including the associated validation groups and the evaluator function.
   *
   * @typeParam T - The type of the value being evaluated.
   */
  export type Metadata<T> = {
    groups: string[];
    validate: Evaluator<T>;
  };

  /**
   * Represents the result of a validation, including the key, message, and whether it's valid.
   */
  export type Result = {
    key: string;
    message: string;
    valid: boolean;
  };

  /**
   * A type that maps field types to their respective validation strategy results.
   *
   * @typeParam Field - The type of the field being validated.
   */
  export type getStrategyResult<T, K extends keyof T> = ReturnType<
    getStrategyClass<T, K>["test"]
  >;

  /**
   * A type that maps field types to their respective validation strategy classes.
   *
   * @typeParam Field - The type of the field being validated.
   */
  // prettier-ignore
  export type getStrategyClass<T, K extends keyof T> =
    true extends StrategyTypes.Function.matches<T, K> 
    ? FunctionStrat<T[K]>
  
    : true extends StrategyTypes.PrimitiveArray.matches<T, K> 
    ? PrimitiveArrayStrat<T[K]>

    : true extends StrategyTypes.PrimitiveGetter.matches<T, K> 
    ? PrimitiveGetterStrat<T[K]>

    : true extends StrategyTypes.PrimitiveArrayGetter.matches<T, K> 
    ? PrimitiveArrayGetterStrat<T[K]>

    : true extends StrategyTypes.Primitive.matches<T, K> 
    ? PrimitiveStrat<T[K]>
  
    : true extends StrategyTypes.ObjectArray.matches<T, K> 
    ? ObjectArrayStrat<T[K]>
  
    : true extends StrategyTypes.ObjectArrayGetter.matches<T, K> 
    ? ObjectArrayGetterStrategy<T[K]>
  
    : true extends StrategyTypes.ObjectGetter.matches<T, K> 
    ? ObjectGetterStrat<T[K]>
  
    : true extends StrategyTypes.Object.matches<T, K> 
    ? ObjectStrat<T[K]>
  :never;
}

export default Validation;
