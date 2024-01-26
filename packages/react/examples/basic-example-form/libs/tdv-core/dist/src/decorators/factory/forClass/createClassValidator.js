"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassValidator = void 0;
const helper_1 = require("../../helper");
const createClassDecorator_1 = require("./createClassDecorator");
/**
 * Creates validation decorators for classes.
 * @typeParam T - The type of class being validated.
 * @param validate - The callback that defines the validation logic.
 * @param groups - Validation groups.
 * @returns A decorator factory for class validators.
 *
 * @example
 * ```typescript
 * \PropGreaterThan("myValue", 10)
 * class MyClass {
 *   public myValue!: number;
 * }
 *
 * function PropGreaterThan<T extends typeof MyClass>(prop: keyof MyClass, value: number) {
 *   return Decorators.ForClass.Validator.build<T>(instance => ({
 *     key: "PropGreaterThan",
 *     valid: instance[prop] > value,
 *     message: `${prop} must be greater than ${value}`
 *   }));
 * }
 * ```
 */
function createClassValidator(validate, decoratorMeta = helper_1.DEFAULT_DECORATOR_META) {
    return (0, createClassDecorator_1.createClassDecorator)(meta => {
        meta.addValidator(validate, decoratorMeta);
    });
}
exports.createClassValidator = createClassValidator;
