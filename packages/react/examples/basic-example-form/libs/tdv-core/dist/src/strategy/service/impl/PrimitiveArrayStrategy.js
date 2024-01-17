"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveArrayStrategy = void 0;
const AbstractValidationStrategyService_1 = require("../AbstractValidationStrategyService");
var PrimitiveArrayStrategy;
(function (PrimitiveArrayStrategy) {
    /**
     * Constant name identifier for this strategy.
     */
    PrimitiveArrayStrategy.Name = "primitive[]";
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of primitive types like numbers, strings, etc.
     *
     * @typeParam F - The type of the field being validated, which is expected to be an array of primitives.
     *
     * @extends AbstractValidationStrategyService<F,DetailedErrors,SimpleErrors>
     */
    class StrategyResolver extends AbstractValidationStrategyService_1.AbstractValidationStrategyService {
        /**
         * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of primitive types.
         *
         * @param value - The array of values to be validated.
         * @param context - The context in which the validation is taking place.
         * @param groups - Optional validation groups to consider during validation.
         *
         * @returns A tuple containing `PrimitiveArrayDetailedErrors` and `PrimitiveArraySimpleErrors`.
         *
         * @remarks
         * The method validates both the array as a whole (`root`) and each individual element (`data`)
         * using the appropriate validation rules.
         */
        test(value, context, args) {
            const valueArray = value !== null && value !== void 0 ? value : [];
            const rootResult = this.getRootErrors(valueArray, context, args);
            const details = {
                root: rootResult,
                data: valueArray.map(v => this.getArrayItemErrors(v, context)),
            };
            const simple = {
                root: this.getErrorMessages(rootResult),
                data: details.data.map(v => this.getErrorMessages(v)),
            };
            return [details, simple];
        }
    }
    PrimitiveArrayStrategy.StrategyResolver = StrategyResolver;
})(PrimitiveArrayStrategy || (exports.PrimitiveArrayStrategy = PrimitiveArrayStrategy = {}));
