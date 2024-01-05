import type API from "../../../index";
import { type FunctionStrat } from "../service/impl/FunctionStrategy";
import { type ObjectArrayGetterStrat } from "../service/impl/ObjectArrayGetterStrategy";
import { type ObjectArrayStrat } from "../service/impl/ObjectArrayStrategy";
import { type ObjectGetterStrat } from "../service/impl/ObjectGetterStrategy";
import { type ObjectStrat } from "../service/impl/ObjectStrategy";
import { type PrimitiveArrayGetterStrat } from "../service/impl/PrimitiveArrayGetterStrategy";
import { type PrimitiveArrayStrat } from "../service/impl/PrimitiveArrayStrategy";
import { type PrimitiveGetterStrat } from "../service/impl/PrimitiveGetterStrategy";
import { type PrimitiveStrat } from "../service/impl/PrimitiveStrategy";
import type * as StrategyTypes from "./StrategyTypes";
/**
 * Evaluates a type, returning either an optional or mandatory evaluation based on the second type parameter.
 * @typeParam T - The type to evaluate.
 * @typeParam R - The result type. Determines if the evaluation is optional or mandatory.
 */
export type evaluate<T, R = undefined> = true extends API.Utilities.Booleans.isUndefined<R> ? API.Utilities.Types.Prettify<API.Utilities.Objects.Purify<evaluateOptional<T, R>>> : API.Utilities.Types.Prettify<API.Utilities.Objects.Purify<evaluateMandatory<T, R>>>;
/**
 * Type for optional evaluation of each field in a type.
 * @typeParam T - The type to evaluate.
 * @typeParam R - The result type.
 */
export type evaluateOptional<T, R> = {
    [K in keyof T]?: fieldEvaluation<T, K, R>;
};
/**
 * Type for mandatory evaluation of each field in a type.
 * @typeParam T - The type to evaluate.
 * @typeParam R - The result type.
 */
export type evaluateMandatory<T, R> = {
    [K in keyof T]-?: fieldEvaluation<T, K, R>;
};
/**
 * Determines the evaluation strategy for a field in a type.
 * @typeParam T - The type containing the field.
 * @typeParam K - The key of the field.
 * @typeParam R - The result type.
 */
export type fieldEvaluation<T, K extends keyof T, R> = true extends StrategyTypes.Function.matches<T, K> ? StrategyTypes.Function.handler<T, K, R> : true extends StrategyTypes.PrimitiveArray.matches<T, K> ? StrategyTypes.PrimitiveArray.handler<T, K, R> : true extends StrategyTypes.PrimitiveGetter.matches<T, K> ? StrategyTypes.PrimitiveGetter.handler<T, K, R> : true extends StrategyTypes.PrimitiveArrayGetter.matches<T, K> ? StrategyTypes.PrimitiveArrayGetter.handler<T, K, R> : true extends StrategyTypes.Primitive.matches<T, K> ? StrategyTypes.Primitive.handler<T, K, R> : true extends StrategyTypes.ObjectArray.matches<T, K> ? StrategyTypes.ObjectArray.handler<T, K, R> : true extends StrategyTypes.ObjectArrayGetter.matches<T, K> ? StrategyTypes.ObjectArrayGetter.handler<T, K, R> : true extends StrategyTypes.ObjectGetter.matches<T, K> ? StrategyTypes.ObjectGetter.handler<T, K, R> : true extends StrategyTypes.Object.matches<T, K> ? StrategyTypes.Object.handler<T, K, R> : never;
/**
 * A type that maps field types to their respective validation strategy results.
 *
 * @typeParam Field - The type of the field being validated.
 */
export type getStrategyResult<T, K extends keyof T> = ReturnType<getStrategyClass<T, K>["test"]>;
/**
 * A type that maps field types to their respective validation strategy classes.
 *
 * @typeParam Field - The type of the field being validated.
 */
export type getStrategyClass<T, K extends keyof T> = true extends StrategyTypes.Function.matches<T, K> ? FunctionStrat<T[K]> : true extends StrategyTypes.PrimitiveArray.matches<T, K> ? PrimitiveArrayStrat<T[K]> : true extends StrategyTypes.PrimitiveGetter.matches<T, K> ? PrimitiveGetterStrat<T[K]> : true extends StrategyTypes.PrimitiveArrayGetter.matches<T, K> ? PrimitiveArrayGetterStrat<T[K]> : true extends StrategyTypes.Primitive.matches<T, K> ? PrimitiveStrat<T[K]> : true extends StrategyTypes.ObjectArray.matches<T, K> ? ObjectArrayStrat<T[K]> : true extends StrategyTypes.ObjectArrayGetter.matches<T, K> ? ObjectArrayGetterStrat<T[K]> : true extends StrategyTypes.ObjectGetter.matches<T, K> ? ObjectGetterStrat<T[K]> : true extends StrategyTypes.Object.matches<T, K> ? ObjectStrat<T[K]> : never;
/**
 * Namespace for Strategy Factory Implementations.
 */
export declare namespace Impl {
    /**
     * Type for detailed errors during validation.
     * @typeParam T - The type being validated.
     */
    type DetailedErrors<T> = evaluate<T, API.Validation.ValidationResult[]>;
    /**
     * Type for basic errors during validation.
     * @typeParam T - The type being validated.
     */
    type Errors<T> = evaluate<T, string[]>;
}
//# sourceMappingURL=StrategyFactory.d.ts.map