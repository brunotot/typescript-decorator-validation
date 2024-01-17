"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionStrategy = void 0;
const Events_1 = require("../../../validation/models/Events");
const AbstractValidationStrategyService_1 = require("../AbstractValidationStrategyService");
var FunctionStrategy;
(function (FunctionStrategy) {
    /**
     * Constant name identifier for this strategy.
     */
    FunctionStrategy.Name = "function";
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating primitive types like numbers, strings, etc.
     *
     * @typeParam F - The type of the field being validated.
     *
     * @extends AbstractValidationStrategyService<F, ValidationResult[], string[]>
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
        test(value, _context) {
            const result = value.bind(_context)();
            if (result instanceof Promise) {
                result.then(validationResult => {
                    this.eventEmitter.emit(Events_1.Events.ASYNC_VALIDATION_COMPLETE, {
                        key: this.fieldName,
                        value: validationResult,
                    });
                }, reason => {
                    throw new Error(reason);
                });
                return StrategyResolver.EMPTY;
            }
            return result.valid ? StrategyResolver.EMPTY : [result, result.message];
        }
    }
    StrategyResolver.EMPTY = [null, null];
    FunctionStrategy.StrategyResolver = StrategyResolver;
})(FunctionStrategy || (exports.FunctionStrategy = FunctionStrategy = {}));
