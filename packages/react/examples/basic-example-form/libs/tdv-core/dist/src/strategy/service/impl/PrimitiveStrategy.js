import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";
export var PrimitiveStrategy;
(function (PrimitiveStrategy) {
    /**
     * Constant name identifier for this strategy.
     */
    PrimitiveStrategy.Name = "primitive";
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating primitive types like numbers, strings, etc.
     *
     * @typeParam F - The type of the field being validated.
     *
     * @extends AbstractValidationStrategyService<F,ValidationResult[],string[]>
     */
    class StrategyResolver extends AbstractValidationStrategyService {
        /**
         * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for primitive types by invoking the root rule's `validate` method and then building simplified error messages.
         *
         * @param value - The value to be validated.
         * @param context - The context in which the validation is taking place.
         * @param groups - Optional validation groups to consider during validation.
         *
         * @returns A tuple containing an array of detailed validation results (`ValidationResult[]`) and an array of simplified error messages (`string[]`).
         */
        test(value, context, args) {
            const root = this.getRootErrors(value, context, args);
            return [root, this.getErrorMessages(root)];
        }
    }
    PrimitiveStrategy.StrategyResolver = StrategyResolver;
})(PrimitiveStrategy || (PrimitiveStrategy = {}));
