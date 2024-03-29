"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveArrayGetterStrategy = void 0;
const AbstractValidationStrategyService_1 = require("../AbstractValidationStrategyService");
const PrimitiveStrategy_1 = require("./PrimitiveStrategy");
var PrimitiveArrayGetterStrategy;
(function (PrimitiveArrayGetterStrategy) {
    /**
     * Constant name identifier for this strategy.
     */
    PrimitiveArrayGetterStrategy.Name = `get (): ${PrimitiveStrategy_1.PrimitiveStrategy.Name}[]`;
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of primitive types like numbers, strings, etc.
     *
     * @typeParam F - The type of the field being validated, which is expected to be an array of primitives.
     *
     * @extends AbstractValidationStrategyService<F, PrimitiveArrayGetterDetailedErrors, PrimitiveArrayGetterSimpleErrors>
     */
    class StrategyResolver extends AbstractValidationStrategyService_1.AbstractValidationStrategyService {
        /**
         * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of primitive types.
         *
         * @param value - The array of values to be validated.
         * @param context - The context in which the validation is taking place.
         * @param groups - Optional validation groups to consider during validation.
         *
         * @returns A tuple containing `PrimitiveArrayGetterDetailedErrors` and `PrimitiveArrayGetterSimpleErrors`.
         *
         * @remarks
         * The method validates both the array as a whole (`node`) and each individual element (`children`)
         * using the appropriate validation rules.
         */
        test(value, context, args) {
            const valueArray = value !== null && value !== void 0 ? value : [];
            const rootResult = this.getRootErrors(valueArray, context, args);
            const details = {
                node: rootResult,
                children: valueArray.map(v => this.getArrayItemErrors(v, context)),
            };
            const simple = {
                node: this.getErrorMessages(rootResult),
                children: details.children.map(v => this.getErrorMessages(v)),
            };
            return [details, simple];
        }
    }
    PrimitiveArrayGetterStrategy.StrategyResolver = StrategyResolver;
})(PrimitiveArrayGetterStrategy || (exports.PrimitiveArrayGetterStrategy = PrimitiveArrayGetterStrategy = {}));
