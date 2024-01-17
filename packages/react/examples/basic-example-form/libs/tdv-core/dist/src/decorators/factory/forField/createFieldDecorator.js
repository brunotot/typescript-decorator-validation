"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFieldDecorator = void 0;
const _reflection_1 = require("../../../reflection");
const _utilities_1 = require("../../../utilities");
/**
 * Creates a new field decorator function using the provided supplier.
 * @typeParam T - The type of the field being decorated.
 * @param supplier - A callback that defines the basic field decorator behavior.
 * @returns A basic field decorator factory.
 */
function createFieldDecorator(supplier) {
    return function (target, context) {
        const isStage2 = typeof context === "string";
        const nameEval = isStage2 ? context : context.name;
        const strategyEval = isStage2 ? target.constructor : context;
        const contextEval = isStage2 ? { name: context, metadata: {} } : context;
        const metaService = _reflection_1.FieldValidatorMetaService.inject(strategyEval, _utilities_1.EventEmitter.EMPTY);
        supplier(metaService, String(nameEval), contextEval, {});
    };
}
exports.createFieldDecorator = createFieldDecorator;
