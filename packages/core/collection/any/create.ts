import API from "api";

/**
 * Creates a custom validator decorator from the `validate` supplier function. Is used by {@link API.Validation.ValidationEngine ValidationEngine} and allows custom validation logic.
 *
 * @typeParam T - The type of the decorated property. May be any type of field except a class.
 * @param props - An object with a custom validation function or a validation function directly.
 * @returns A validator decorator function to use with class fields.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class User {
 *   _@create(value => ({ valid: value >= 18, key: "AdultAge", message: "You must be an adult (18+)" }))
 *   age: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying custom groups
 * ```ts
 * class User {
 *   _@create({
 *     groups: ["UPDATE"],
 *     validate: value => ({
 *       key: "AdultAge",
 *       valid: value >= 18,
 *       message: "You must be an adult (18+)"
 *     })
 *   })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 3: Creating a factory method to use at multiple places
 *
 * ```ts
 * function AdultAge() {
 *   return create<number>({
 *     groups: ["UPDATE"],
 *     validate: value => ({
 *       key: "AdultAge",
 *       valid: value >= 18,
 *       message: "You must be an adult (18+)"
 *     })
 *   });
 * }
 *
 * class User {
 *   _@AdultAge()
 *   age: number;
 * }
 * ```
 */
// prettier-ignore
export function create<T>(
  props: API.Validation.Evaluator<T> | {
    validate: API.Validation.Evaluator<T>;
    groups?: string | string[];
  }
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    validate: API.Decorator.args(props, "validate") as any,
    groups: API.Decorator.groups(props),
  });
}
