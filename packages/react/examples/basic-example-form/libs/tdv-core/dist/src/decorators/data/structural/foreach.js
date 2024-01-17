"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foreach = void 0;
const createFieldDecorator_1 = require("../../factory/forField/createFieldDecorator");
/**
 * Creates a validator decorator which applies multiple validators to each element in array field.
 * @typeParam T - The type of the array property.
 * @param validators - An array of validators to apply to each element in the array.
 * @returns A decorator function to use with class array fields.
 * @example
 * 1: Applies the `MinLength` and `MaxLength` validators to each element in the `names` array property.
 * ```ts
 * class MyClass {
 *   \@foreach(\@MinLength(5), \@MaxLength(10))
 *   names: string[];
 * }
 * ```
 */
function foreach(...validators) {
    return (0, createFieldDecorator_1.createFieldDecorator)((meta, property, context) => {
        const validationProcessor = meta.getUntypedDescriptor(property);
        validationProcessor.thisDefault = [];
        validators.forEach(validator => {
            validator(undefined, context);
            const rules = validationProcessor.validations;
            const rootRules = rules.root;
            const foreachRules = rules.foreach;
            foreachRules.add(rootRules.pop());
        });
    });
}
exports.foreach = foreach;
