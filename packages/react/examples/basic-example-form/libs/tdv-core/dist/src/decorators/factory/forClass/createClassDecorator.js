"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassDecorator = void 0;
const _reflection_1 = require("../../../reflection");
const _utilities_1 = require("../../../utilities");
/**
 * Creates a new class decorator function using the provided supplier.
 *
 * @typeParam T - The type of the class being decorated.
 * @param supplier - A callback that defines the basic class decorator behavior and returns the modified class.
 * @returns A basic class decorator factory.
 */
function createClassDecorator(supplier) {
    return function (baseClass, context) {
        return supplier(_reflection_1.ClassValidatorMetaService.inject(baseClass !== null && baseClass !== void 0 ? baseClass : context, _utilities_1.EventEmitter.EMPTY), baseClass, context);
    };
}
exports.createClassDecorator = createClassDecorator;
