import Condition from "../../types/namespace/condition.namespace";
import Validation from "../../types/namespace/validation.namespace";
import $ from "./../../types";
import StrategyTypes from "./types";

namespace StrategyFactory {
  export type evaluate<T, R = undefined> = true extends Condition.isUndefined<R>
    ? $.Helper.Purify<evaluateOptional<T, R>>
    : $.Helper.Purify<evaluateMandatory<T, R>>;

  export type evaluateOptional<T, R> = {
    [K in keyof T]?: fieldEvaluation<T, K, R>;
  };

  export type evaluateMandatory<T, R> = {
    [K in keyof T]-?: fieldEvaluation<T, K, R>;
  };

  // prettier-ignore
  export type fieldEvaluation<T, K extends keyof T, R> = 
    true extends StrategyTypes.Primitive.matches<T, K> 
    ? StrategyTypes.Primitive.handler<T, K, R>
   
    : true extends StrategyTypes.PrimitiveArray.matches<T, K> 
    ? StrategyTypes.PrimitiveArray.handler<T, K, R>
   
    : true extends StrategyTypes.ObjectArray.matches<T, K> 
    ? StrategyTypes.ObjectArray.handler<T, K, R>
   
    : true extends StrategyTypes.Object.matches<T, K> 
    ? StrategyTypes.Object.handler<T, K, R>
  :never;

  export namespace Impl {
    export type DetailedErrors<T> = evaluate<T, Validation.Result[]>;
    export type Errors<T> = evaluate<T, string[]>;
  }
}

export default StrategyFactory;
