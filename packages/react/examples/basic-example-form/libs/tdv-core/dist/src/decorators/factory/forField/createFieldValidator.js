"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFieldValidator = void 0;
const helper_1 = require("../../helper");
const createFieldDecorator_1 = require("./createFieldDecorator");
/**
 * Creates validation decorators for fields.
 *
 * @typeParam T - The type of the value being validated.
 * @param validate - The callback that defines the validation logic.
 * @param groups - Validation groups.
 * @returns A decorator function that can be applied to class properties to add the validation logic.
 *
 * @example
 * ```typescript
 * class MyClass {
 *   \GreaterThan(10)
 *   public myValue!: number;
 * }
 *
 * function GreaterThan<T extends number>(min: number) {
 *   return createFieldValidator<T>(value => ({
 *     key: "GreaterThan",
 *     valid: value > min,
 *     message: `${prop} must be greater than ${min}`
 *   }));
 * }
 * ```
 */
function createFieldValidator(validate, decoratorMeta = helper_1.DEFAULT_DECORATOR_META) {
    return (0, createFieldDecorator_1.createFieldDecorator)((meta, property) => {
        meta.addValidator(property, validate, decoratorMeta);
    });
}
exports.createFieldValidator = createFieldValidator;
