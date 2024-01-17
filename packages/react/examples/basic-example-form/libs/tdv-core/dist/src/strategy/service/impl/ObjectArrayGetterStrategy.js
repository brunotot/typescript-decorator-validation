"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectArrayGetterStrategy = void 0;
const AbstractValidationStrategyService_1 = require("../AbstractValidationStrategyService");
const ObjectStrategy_1 = require("./ObjectStrategy");
var ObjectArrayGetterStrategy;
(function (ObjectArrayGetterStrategy) {
    /**
     * Constant name identifier for this strategy.
     */
    ObjectArrayGetterStrategy.Name = `() => ${ObjectStrategy_1.ObjectStrategy.Name}[]`;
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of object types.
     *
     * @typeParam F - The type of the field being validated, which is expected to be an array of objects.
     *
     * @extends AbstractValidationStrategyService<F, ObjectArrayGetterDetailedErrors<F>, ObjectArrayGetterSimpleErrors<F>>
     */
    class StrategyResolver extends AbstractValidationStrategyService_1.AbstractValidationStrategyService {
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
        test(value, context, args) {
            const _value = value !== null && value !== void 0 ? value : [];
            const rootResult = this.getRootErrors(value, context, args);
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const getData = (element) => {
                const [errors, detailedErrors] = new ObjectStrategy_1.ObjectStrategy.StrategyResolver(this.fieldDescriptor, this.defaultValue, this.groups, this.locale, this.eventEmitter, this.engineCfg.asyncDelay).test(element, context, args);
                return {
                    detailedErrors,
                    errors,
                };
            };
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const getErrors = (element) => getData(element).errors;
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const getDetailedErrors = (element) => getData(element).detailedErrors;
            const details = {
                root: rootResult,
                data: _value.map(getDetailedErrors),
            };
            const simple = {
                root: this.getErrorMessages(rootResult),
                data: _value.map(getErrors),
            };
            return [details, simple];
        }
    }
    ObjectArrayGetterStrategy.StrategyResolver = StrategyResolver;
})(ObjectArrayGetterStrategy || (exports.ObjectArrayGetterStrategy = ObjectArrayGetterStrategy = {}));
