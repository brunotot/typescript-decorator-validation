import { AbstractValidationStrategyService } from "../../../service/AbstractValidationStrategyService";
/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating primitive types like numbers, strings, etc.
 *
 * @typeParam F - The type of the field being validated.
 *
 * @extends AbstractValidationStrategyService<F, Validation.Result[], string[]>
 */
export class PrimitiveStrat extends AbstractValidationStrategyService {
    /**
     * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for primitive types by invoking the root rule's `validate` method and then building simplified error messages.
     *
     * @param value - The value to be validated.
     * @param context - The context in which the validation is taking place.
     * @param groups - Optional validation groups to consider during validation.
     *
     * @returns A tuple containing an array of detailed validation results (`Validation.Result[]`) and an array of simplified error messages (`string[]`).
     */
    test(value, context) {
        const root = this.getRootErrors(value, context);
        return [root, this.getErrorMessages(root)];
    }
}
