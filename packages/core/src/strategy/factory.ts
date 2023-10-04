import $ from "../api/prettify";
import Validation from "../engine";
import Booleans from "../utilities/impl/Booleans";
import Objects from "../utilities/impl/Objects";
import FunctionStrat from "./impl/FunctionStrategy";
import ObjectArrayGetterStrategy from "./impl/ObjectArrayGetterStrategy";
import ObjectArrayStrategy from "./impl/ObjectArrayStrategy";
import ObjectGetterStrat from "./impl/ObjectGetterStrategy";
import ObjectStrat from "./impl/ObjectStrategy";
import PrimitiveArrayGetterStrat from "./impl/PrimitiveArrayGetterStrategy";
import PrimitiveArrayStrat from "./impl/PrimitiveArrayStrategy";
import PrimitiveGetterStrat from "./impl/PrimitiveGetterStrategy";
import PrimitiveStrat from "./impl/PrimitiveStrategy";
import StrategyTypes from "./types";

namespace StrategyFactory {
  export type evaluate<T, R = undefined> = true extends Booleans.isUndefined<R>
    ? $<Objects.Purify<evaluateOptional<T, R>>>
    : $<Objects.Purify<evaluateMandatory<T, R>>>;

  export type evaluateOptional<T, R> = {
    [K in keyof T]?: fieldEvaluation<T, K, R>;
  };

  export type evaluateMandatory<T, R> = {
    [K in keyof T]-?: fieldEvaluation<T, K, R>;
  };

  // prettier-ignore
  export type fieldEvaluation<T, K extends keyof T, R> = 
    true extends StrategyTypes.Function.matches<T, K> 
    ? StrategyTypes.Function.handler<T, K, R>
   
    : true extends StrategyTypes.PrimitiveArray.matches<T, K> 
    ? StrategyTypes.PrimitiveArray.handler<T, K, R>

    : true extends StrategyTypes.PrimitiveGetter.matches<T, K> 
    ? StrategyTypes.PrimitiveGetter.handler<T, K, R>

    : true extends StrategyTypes.PrimitiveArrayGetter.matches<T, K> 
    ? StrategyTypes.PrimitiveArrayGetter.handler<T, K, R>

    : true extends StrategyTypes.Primitive.matches<T, K> 
    ? StrategyTypes.Primitive.handler<T, K, R>
   
    : true extends StrategyTypes.ObjectArray.matches<T, K> 
    ? StrategyTypes.ObjectArray.handler<T, K, R>
   
    : true extends StrategyTypes.ObjectArrayGetter.matches<T, K> 
    ? StrategyTypes.ObjectArrayGetter.handler<T, K, R>
   
    : true extends StrategyTypes.ObjectGetter.matches<T, K> 
    ? StrategyTypes.ObjectGetter.handler<T, K, R>
   
    : true extends StrategyTypes.Object.matches<T, K> 
    ? StrategyTypes.Object.handler<T, K, R>
  :never;

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
    ? ObjectArrayStrategy<T[K]>
  
    : true extends StrategyTypes.ObjectArrayGetter.matches<T, K> 
    ? ObjectArrayGetterStrategy<T[K]>
  
    : true extends StrategyTypes.ObjectGetter.matches<T, K> 
    ? ObjectGetterStrat<T[K]>
  
    : true extends StrategyTypes.Object.matches<T, K> 
    ? ObjectStrat<T[K]>
  :never;

  export namespace Impl {
    export type DetailedErrors<T> = evaluate<T, Validation.Result[]>;

    export type Errors<T> = evaluate<T, string[]>;
  }
}

export default StrategyFactory;
