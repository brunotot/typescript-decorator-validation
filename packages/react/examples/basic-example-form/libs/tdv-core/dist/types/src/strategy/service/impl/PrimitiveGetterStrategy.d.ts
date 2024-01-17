import { type DecoratorArgs } from "../../../decorators";
import { type Booleans, type Types } from "../../../utilities";
import type { ValidationResult } from "../../../validation/types";
import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";
export declare namespace PrimitiveGetterStrategy {
    /**
     * Constant name identifier for this strategy.
     */
    const Name: "get (): primitive";
    /**
     * Represents the simplified error structure for validating getter methods that return primitive types.
     */
    type SimpleErrors = string[];
    /**
     * Represents the detailed error structure for validating getter methods that return primitive types.
     */
    type DetailedErrors = ValidationResult[];
    /**
     * Type guard to check if a certain field in a type matches this strategy.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     */
    type matches<T, K extends keyof T> = true extends Booleans.isGetter<T, K> ? Booleans.isAnyOf<T[K], Types.PrimitiveType> : false;
    /**
     * Type for the handler function based on the field and result types.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     * @typeParam R - The result type.
     */
    type handler<T, K extends keyof T, R> = true extends Booleans.isUndefined<R> ? T[K] : R;
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating getter primitive types like numbers, strings, etc.
     *
     * @typeParam F - The type of the field being validated.
     *
     * @extends AbstractValidationStrategyService<F,ValidationResult[],string[]>
     */
    class StrategyResolver<F> extends AbstractValidationStrategyService<F, DetailedErrors, SimpleErrors> {
        /**
         * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for primitive types by invoking the root rule's `validate` method and then building simplified error messages.
         *
         * @param value - The value to be validated.
         * @param context - The context in which the validation is taking place.
         *
         * @returns A tuple containing an array of detailed validation results (`ValidationResult[]`) and an array of simplified error messages (`string[]`).
         */
        test(value: any, context: any, args: DecoratorArgs): [DetailedErrors, SimpleErrors];
    }
}
//# sourceMappingURL=PrimitiveGetterStrategy.d.ts.map