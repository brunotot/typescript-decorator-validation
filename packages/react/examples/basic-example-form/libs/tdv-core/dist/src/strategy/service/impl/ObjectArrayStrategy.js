import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";
import { ObjectStrategy } from "./ObjectStrategy";
export var ObjectArrayStrategy;
(function (ObjectArrayStrategy) {
    /**
     * Constant name identifier for this strategy.
     */
    ObjectArrayStrategy.Name = "composite[]";
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of object types.
     *
     * @typeParam F - The type of the field being validated, which is expected to be an array of objects.
     *
     * @extends AbstractValidationStrategyService<F, ObjectArrayDetailedErrors<F>, ObjectArraySimpleErrors<F>>
     */
    class StrategyResolver extends AbstractValidationStrategyService {
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
        test(value, context, args) {
            const _value = value !== null && value !== void 0 ? value : [];
            const rootResult = this.getRootErrors(value, context, args);
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const getData = (element) => {
                const [errors, detailedErrors] = new ObjectStrategy.StrategyResolver(this.fieldDescriptor, this.defaultValue, this.groups, this.locale, this.eventEmitter, this.engineCfg.asyncDelay).test(element, context, args);
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
    ObjectArrayStrategy.StrategyResolver = StrategyResolver;
})(ObjectArrayStrategy || (ObjectArrayStrategy = {}));
