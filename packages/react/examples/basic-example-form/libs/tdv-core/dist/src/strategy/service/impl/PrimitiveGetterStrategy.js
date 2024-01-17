"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveGetterStrategy = void 0;
const AbstractValidationStrategyService_1 = require("../AbstractValidationStrategyService");
const PrimitiveStrategy_1 = require("./PrimitiveStrategy");
var PrimitiveGetterStrategy;
(function (PrimitiveGetterStrategy) {
    /**
     * Constant name identifier for this strategy.
     */
    PrimitiveGetterStrategy.Name = `get (): ${PrimitiveStrategy_1.PrimitiveStrategy.Name}`;
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating getter primitive types like numbers, strings, etc.
     *
     * @typeParam F - The type of the field being validated.
     *
     * @extends AbstractValidationStrategyService<F,ValidationResult[],string[]>
     */
    class StrategyResolver extends AbstractValidationStrategyService_1.AbstractValidationStrategyService {
        /**
         * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for primitive types by invoking the root rule's `validate` method and then building simplified error messages.
         *
         * @param value - The value to be validated.
         * @param context - The context in which the validation is taking place.
         *
         * @returns A tuple containing an array of detailed validation results (`ValidationResult[]`) and an array of simplified error messages (`string[]`).
         */
        test(value, context, args) {
            const root = this.getRootErrors(value, context, args);
            return [root, this.getErrorMessages(root)];
        }
    }
    PrimitiveGetterStrategy.StrategyResolver = StrategyResolver;
})(PrimitiveGetterStrategy || (exports.PrimitiveGetterStrategy = PrimitiveGetterStrategy = {}));
