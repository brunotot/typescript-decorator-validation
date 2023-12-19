import API from "../../../index";
/**
 * A service class which exposes validated-decorator-related actions
 */
var ClassDecoratorValidatorService;
(function (ClassDecoratorValidatorService) {
    /**
     * Creates a new validator function using the provided validation builder options.
     *
     * @typeParam T - The type of the value being validated.
     *
     * @param groups - An array of group names that this validator belongs to. Validators in the same group can be executed together.
     * @param isValid - A function that performs the actual validation logic. It takes a value of type `T` and returns a boolean indicating whether the value is valid.
     *
     * @returns A decorator function that can be applied to class properties to add the validation logic.
     *
     * @remarks
     * This function leverages the `makeDecorator` function to build a new decorator.
     * It uses the `validationMetaService` to add the new validator to the metadata for the property it decorates.
     *
     * @example
     * ```typescript
     * const IsPositive = ClassDecoratorValidatorService.build<number>({
     *   groups: ['group1'],
     *   isValid: (value) => value > 0
     * });
     *
     * class MyClass {
     *   \@IsPositive
     *   public myValue: number;
     * }
     * ```
     */
    function build(validate, options) {
        return API.Decorator.Service.ClassDecoratorService.build(meta => {
            meta.addValidator(validate, API.Decorator.groups(options));
        });
    }
    ClassDecoratorValidatorService.build = build;
})(ClassDecoratorValidatorService || (ClassDecoratorValidatorService = {}));
export default ClassDecoratorValidatorService;
