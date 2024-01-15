import type { ValidationEvaluator } from "@validation/types";
import { type FieldDecorator, createFieldDecorator } from "./createFieldDecorator";

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
export function createFieldValidator<T extends unknown>(
  validate: ValidationEvaluator<T>,
  groups?: string[]
): FieldDecorator<T> {
  return createFieldDecorator<T>((meta, key) => {
    meta.addValidator(key, validate, groups ?? []);
  });
}
