import { FunctionStrategy, ObjectArrayGetterStrategy, ObjectArrayStrategy, ObjectGetterStrategy, ObjectStrategy, PrimitiveArrayGetterStrategy, PrimitiveArrayStrategy, PrimitiveGetterStrategy, PrimitiveStrategy } from "../service/impl";
import { Booleans, Objects, Types } from "../../utilities";
import type { ValidationResult } from "../../validation/types";
/**
 * Evaluates a type, returning either an optional or mandatory evaluation based on the second type parameter.
 * @typeParam T - The type to evaluate.
 * @typeParam R - The result type. Determines if the evaluation is optional or mandatory.
 */
export type evaluate<T, R = undefined> = true extends Booleans.isUndefined<R> ? Types.Prettify<Objects.Purify<evaluateOptional<T, R>>> : Types.Prettify<Objects.Purify<evaluateMandatory<T, R>>>;
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
export type fieldEvaluation<T, K extends keyof T, R> = true extends FunctionStrategy.matches<T, K> ? FunctionStrategy.handler<T, K, R> : true extends PrimitiveArrayStrategy.matches<T, K> ? PrimitiveArrayStrategy.handler<T, K, R> : true extends PrimitiveGetterStrategy.matches<T, K> ? PrimitiveGetterStrategy.handler<T, K, R> : true extends PrimitiveArrayGetterStrategy.matches<T, K> ? PrimitiveArrayGetterStrategy.handler<T, K, R> : true extends PrimitiveStrategy.matches<T, K> ? PrimitiveStrategy.handler<T, K, R> : true extends ObjectArrayStrategy.matches<T, K> ? ObjectArrayStrategy.handler<T, K, R> : true extends ObjectArrayGetterStrategy.matches<T, K> ? ObjectArrayGetterStrategy.handler<T, K, R> : true extends ObjectGetterStrategy.matches<T, K> ? ObjectGetterStrategy.handler<T, K, R> : true extends ObjectStrategy.matches<T, K> ? ObjectStrategy.handler<T, K, R> : never;
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
export type getStrategyClass<T, K extends keyof T> = true extends FunctionStrategy.matches<T, K> ? FunctionStrategy.StrategyResolver<T[K]> : true extends PrimitiveArrayStrategy.matches<T, K> ? PrimitiveArrayStrategy.StrategyResolver<T[K]> : true extends PrimitiveGetterStrategy.matches<T, K> ? PrimitiveGetterStrategy.StrategyResolver<T[K]> : true extends PrimitiveArrayGetterStrategy.matches<T, K> ? PrimitiveArrayGetterStrategy.StrategyResolver<T[K]> : true extends PrimitiveStrategy.matches<T, K> ? PrimitiveStrategy.StrategyResolver<T[K]> : true extends ObjectArrayStrategy.matches<T, K> ? ObjectArrayStrategy.StrategyResolver<T[K]> : true extends ObjectArrayGetterStrategy.matches<T, K> ? ObjectArrayGetterStrategy.StrategyResolver<T[K]> : true extends ObjectGetterStrategy.matches<T, K> ? ObjectGetterStrategy.StrategyResolver<T[K]> : true extends ObjectStrategy.matches<T, K> ? ObjectStrategy.StrategyResolver<T[K]> : never;
/**
 * Type for detailed errors during validation.
 * @typeParam T - The type being validated.
 */
export type DetailedErrorsResponse<T> = evaluate<T, ValidationResult[]>;
/**
 * Type for basic errors during validation.
 * @typeParam T - The type being validated.
 */
export type SimpleErrorsResponse<T> = evaluate<T, string[]>;
//# sourceMappingURL=StrategyFactory.d.ts.map