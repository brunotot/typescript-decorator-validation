import { ClassValidatorMetaService } from "../../../reflection";
import { EventEmitter } from "../../../utilities";
/**
 * Creates a new class decorator function using the provided supplier.
 *
 * @typeParam T - The type of the class being decorated.
 * @param supplier - A callback that defines the basic class decorator behavior and returns the modified class.
 * @returns A basic class decorator factory.
 */
export function createClassDecorator(supplier) {
    return function (baseClass, context) {
        return supplier(ClassValidatorMetaService.inject(baseClass !== null && baseClass !== void 0 ? baseClass : context, EventEmitter.EMPTY), baseClass, context);
    };
}
