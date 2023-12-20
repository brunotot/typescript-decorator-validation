import API from "../../../index";
/**
 * Creates a new class decorator function using the provided supplier.
 *
 * @typeParam T - The type of the class being decorated.
 * @param supplier - A callback that defines the basic class decorator behavior and returns the modified class.
 * @returns A basic class decorator factory.
 */
export function build(supplier) {
    return function (baseClass, context) {
        return supplier(API.Reflection.Services.ClassValidatorMetaService.inject(context), baseClass, context);
    };
}
