import API from "../../index";

/**
 * Creates a custom validator decorator from the `validate` supplier function. Is used by {@link API.Validation.ValidationEngine ValidationEngine} and allows custom validation logic.
 *
 * @typeParam T - The type of the decorated property. May be any type of field except a class.
 * @param validate - A validation evaluation callback.
 * @param groups - The groups under which the decorator validates property.
 * @returns A validator decorator function to use with class fields.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class User {
 *   \@create(value => ({
 *     valid: value >= 18,
 *     key: "AdultAge",
 *     message: "You must be an adult (18+)"
 *   }))
 *   age: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying custom groups
 * ```ts
 * class User {
 *   \@create(value => ({
 *     key: "AdultAge",
 *     valid: value >= 18,
 *     message: "You must be an adult (18+)"
 *   }), ["UPDATE"])
 *   age: number;
 * }
 * ```
 *
 * @example
 * 3: Creating a factory method to use at multiple places
 *
 * ```ts
 * function AdultAge() {
 *   return create<number>(value => ({
 *     key: "AdultAge",
 *     valid: value >= 18,
 *     message: "You must be an adult (18+)"
 *   }), ["UPDATE"]);
 * }
 *
 * class User {
 *   \@AdultAge()
 *   age: number;
 * }
 * ```
 */
export function create<T>(
  validate: API.Validation.Evaluator<T>,
  groups?: string[]
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(validate, groups);
}
