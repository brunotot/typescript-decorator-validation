import { DecoratorArgs } from "../../../decorators";
import { DetailedErrorsResponse, SimpleErrorsResponse } from "../../models/StrategyFactory";
import { Arrays, Booleans } from "../../../utilities";
import type { ValidationResult } from "../../../validation/types";
import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";
import { ObjectStrategy } from "./ObjectStrategy";
export declare namespace ObjectArrayGetterStrategy {
    /**
     * Constant name identifier for this strategy.
     */
    const Name: "() => composite[]";
    /**
     * Represents the simplified error structure for validating arrays of object types.
     *
     * @typeParam F - The type of the field being validated.
     *
     * - `field`: An array of string messages that represent validation errors at the array level.
     * - `data`: An array of `Errors<F>` objects that represent validation errors for each object in the array.
     */
    type SimpleErrors<F> = {
        root: string[];
        data: Array<SimpleErrorsResponse<F>>;
    };
    /**
     * Represents the detailed error structure for validating arrays of object types.
     *
     * @typeParam F - The type of the field being validated.
     *
     * - `field`: An array of `ValidationResult` objects that represent detailed validation errors at the array level.
     * - `data`: An array of `DetailedErrors<F>` objects that represent detailed validation errors for each object in the array.
     */
    type DetailedErrors<F> = {
        root: ValidationResult[];
        data: Array<DetailedErrorsResponse<F>>;
    };
    /**
     * Type guard to check if a certain field in a type matches this strategy.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     */
    type matches<T, K extends keyof T> = true extends Booleans.isGetter<T, K> ? Arrays.getArrayType<NonNullable<T[K]>> extends never ? false : Booleans.isObject<Arrays.getArrayType<NonNullable<T[K]>>> : false;
    /**
     * Type for the handler function based on the field and result types.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     * @typeParam R - The result type.
     */
    type handler<T, K extends keyof T, R> = Array<ObjectStrategy.handler<T, K, R>>;
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of object types.
     *
     * @typeParam F - The type of the field being validated, which is expected to be an array of objects.
     *
     * @extends AbstractValidationStrategyService<F, ObjectArrayGetterDetailedErrors<F>, ObjectArrayGetterSimpleErrors<F>>
     */
    class StrategyResolver<F> extends AbstractValidationStrategyService<F, DetailedErrors<F>, SimpleErrors<F>> {
        /**
         * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of object types.
         *
         * @param value - The array of object values to be validated.
         * @param context - The context in which the validation is taking place.
         * @param groups - Optional validation groups to consider during validation.
         *
         * @returns A tuple containing `ObjectArrayGetterDetailedErrors<F>` and `ObjectArrayGetterSimpleErrors<F>`.
         *
         * @remarks
         * The method validates both the array as a whole (`field`) and each individual object (`data`)
         * using the appropriate validation rules.
         */
        test(value: any[], context: any, args: DecoratorArgs): [DetailedErrors<F>, SimpleErrors<F>];
    }
}
//# sourceMappingURL=ObjectArrayGetterStrategy.d.ts.map