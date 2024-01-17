import { type DecoratorArgs } from "../../../decorators";
import { type DetailedErrorsResponse, type SimpleErrorsResponse, type evaluate } from "../../models/StrategyFactory";
import { type Booleans } from "../../../utilities";
import type { ValidationResult } from "../../../validation/types";
import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";
export declare namespace ObjectStrategy {
    /**
     * Constant name identifier for this strategy.
     */
    const Name: "composite";
    /**
     * Represents the simplified error structure for validating object types.
     * @typeParam F - The type of the field being validated.
     */
    type SimpleErrors<F> = {
        /** An array of string messages that represent validation errors at the decorated field level. */
        root: string[];
        /** An object that represents simplified validation errors for each property in the object. */
        data: SimpleErrorsResponse<F>;
    };
    /**
     * Represents the detailed error structure for validating object types.
     * @typeParam F - The type of the field being validated.
     */
    type DetailedErrors<F> = {
        /** An array of validation result objects that represent detailed validation errors at the decorated field level. */
        root: ValidationResult[];
        /** An object that represents detailed validation errors for each property in the object. */
        data: DetailedErrorsResponse<F>;
    };
    /**
     * Type guard to check if a certain field in a type matches this strategy.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     */
    type matches<T, K extends keyof T> = true extends Booleans.isGetter<T, K> ? false : Booleans.isObject<T[K]>;
    /**
     * Type for the handler function based on the field and result types.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     * @typeParam R - The result type.
     */
    type handler<T, K extends keyof T, R> = true extends Booleans.isUndefined<R> ? T[K] : {
        root: R;
        data: evaluate<T[K], R>;
    };
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating object types.
     *
     * @typeParam F - The type of the field being validated, which is expected to be an object.
     *
     * @extends AbstractValidationStrategyService<F, ObjectDetailedErrors<F>, ObjectSimpleErrors<F>>
     */
    class StrategyResolver<F> extends AbstractValidationStrategyService<F, DetailedErrors<F>, SimpleErrors<F>> {
        /**
         * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for object types.
         *
         * @param value - The object value to be validated.
         * @param context - The context in which the validation is taking place.
         * @param groups - Optional validation groups to consider during validation.
         *
         * @returns A tuple containing `ObjectDetailedErrors<F>` and `ObjectSimpleErrors<F>`.
         *
         * @remarks
         * The method validates both the object as a whole (`node`) and its properties (`children`)
         * using the appropriate validation rules.
         */
        test(value: any, context: any, args: DecoratorArgs): [DetailedErrors<F>, SimpleErrors<F>];
    }
}
//# sourceMappingURL=ObjectStrategy.d.ts.map