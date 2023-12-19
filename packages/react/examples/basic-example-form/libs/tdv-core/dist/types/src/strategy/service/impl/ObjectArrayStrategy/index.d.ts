import { AbstractValidationStrategyService } from "../../../service/AbstractValidationStrategyService";
import type ns from "./types";
/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of object types.
 *
 * @typeParam F - The type of the field being validated, which is expected to be an array of objects.
 *
 * @extends AbstractValidationStrategyService<F, ObjectArrayDetailedErrors<F>, ObjectArraySimpleErrors<F>>
 */
export declare class ObjectArrayStrat<F> extends AbstractValidationStrategyService<F, ns.DetailedErrors<F>, ns.SimpleErrors<F>> {
    /**
     * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of object types.
     *
     * @param value - The array of object values to be validated.
     * @param context - The context in which the validation is taking place.
     * @param groups - Optional validation groups to consider during validation.
     *
     * @returns A tuple containing `ObjectArrayDetailedErrors<F>` and `ObjectArraySimpleErrors<F>`.
     *
     * @remarks
     * The method validates both the array as a whole (`field`) and each individual object (`data`)
     * using the appropriate validation rules.
     */
    test(value: any[], context: any): [ns.DetailedErrors<F>, ns.SimpleErrors<F>];
}
//# sourceMappingURL=index.d.ts.map