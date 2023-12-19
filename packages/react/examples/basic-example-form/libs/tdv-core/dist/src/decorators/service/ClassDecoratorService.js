import API from "../../../index";
/**
 * Namespace that provides various types and utility functions for Class Decorators.
 */
var ClassDecoratorService;
(function (ClassDecoratorService) {
    /**
     * Builds an Instance function using the provided Supplier function.
     * @param supplier - A Supplier function to use for building the Instance.
     * @returns An Instance function.
     */
    function build(supplier) {
        return function (baseClass, context) {
            return supplier(API.Reflection.Services.ClassValidatorMetaService.inject(context), baseClass, context);
        };
    }
    ClassDecoratorService.build = build;
})(ClassDecoratorService || (ClassDecoratorService = {}));
export default ClassDecoratorService;
