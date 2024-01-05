import API from "../../../index";
import { EventEmitter } from "../../../utilities/misc/EventEmitter";
/**
 * Creates a new field decorator function using the provided supplier.
 * @typeParam T - The type of the field being decorated.
 * @param supplier - A callback that defines the basic field decorator behavior.
 * @returns A basic field decorator factory.
 */
export function createFieldDecorator(supplier) {
    return function (target, context) {
        const isStage2 = typeof context === "string";
        const nameEval = isStage2 ? context : context.name;
        const strategyEval = isStage2 ? target.constructor : context;
        const contextEval = isStage2 ? { name: context, metadata: {} } : context;
        const metaService = API.Reflection.FieldValidatorMetaService.inject(strategyEval, EventEmitter.EMPTY);
        supplier(metaService, String(nameEval), contextEval, {});
    };
}
