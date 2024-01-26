import { type DecoratorMeta } from "../../helper";
import { type Types } from "../../../utilities";
import type { ValidationEvaluator } from "../../../validation/types";
import { type ClassDecorator } from "./createClassDecorator";
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
export declare function createClassValidator<T extends Types.Class>(validate: ValidationEvaluator<Types.UnwrapClass<T>>, decoratorMeta?: DecoratorMeta<T>): ClassDecorator<T>;
//# sourceMappingURL=createClassValidator.d.ts.map