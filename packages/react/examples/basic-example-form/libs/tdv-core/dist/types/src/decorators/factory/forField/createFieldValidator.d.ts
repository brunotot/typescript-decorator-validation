import type API from "../../../index";
import { type FieldDecorator } from "./createFieldDecorator";
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
export declare function createFieldValidator<T extends unknown>(validate: API.Validation.ValidationEvaluator<T>, groups?: string[]): FieldDecorator<T>;
//# sourceMappingURL=createFieldValidator.d.ts.map