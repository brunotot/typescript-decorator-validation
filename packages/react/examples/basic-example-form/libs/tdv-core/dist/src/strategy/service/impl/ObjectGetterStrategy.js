import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";
import { ObjectStrategy } from "./ObjectStrategy";
export var ObjectGetterStrategy;
(function (ObjectGetterStrategy) {
    ObjectGetterStrategy.Name = `(): ${ObjectStrategy.Name}`;
    /**
     * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating object types.
     *
     * @typeParam F - The type of the field being validated, which is expected to be an object.
     *
     * @extends AbstractValidationStrategyService<F, ObjectDetailedErrors<F>, ObjectSimpleErrors<F>>
     */
    class StrategyResolver extends AbstractValidationStrategyService {
        /**
         * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for object types.
         *
         * @param value - The object value to be validated.
         * @param context - The context in which the validation is taking place.
         * @param groups - Optional validation groups to consider during validation.
         *
         * @returns A tuple containing `ObjectDetailedErrors<F>` and `ObjectSimpleErrors<F>`.
         *
         * @remarks
         * The method validates both the object as a whole (`node`) and its properties (`children`)
         * using the appropriate validation rules.
         */
        test(value, context, args) {
            const { detailedErrors, errors } = this.fieldEngine.validate(value);
            const rootResult = [...this.getRootErrors(value, context, args), ...this.getClassErrors(value, context)];
            const detailedErrorsResult = {
                root: rootResult,
                data: detailedErrors,
            };
            const errorsResult = {
                root: this.getErrorMessages(rootResult),
                data: errors,
            };
            return [detailedErrorsResult, errorsResult];
        }
    }
    ObjectGetterStrategy.StrategyResolver = StrategyResolver;
})(ObjectGetterStrategy || (ObjectGetterStrategy = {}));
