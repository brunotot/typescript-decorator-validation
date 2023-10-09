import API from "api";

/**
 * Creates a custom validator decorator which is later used by {@link API.Validation.ValidationEngine ValidationEngine} to register validation rules.
 *
 * @typeParam T - The type of the decorated property. May be any type of field except a class.
 * @param props - An object with a custom validation function or a validation function directly.
 * @returns A validator decorator function to use with class fields.
 *
 * @example
 * Example 1: Basic usage with a custom validation function
 * ```ts
 * class Order {
 *   _@create(value => ({ valid: value > 5, key: "totalPrice", message: "Total price is invalid" }))
 *   totalPrice: number;
 * }
 * ```
 *
 * @example
 * Example 2: Using an object with validation function and groups
 * ```ts
 * class Product {
 *   _@create({
 *     groups: ["checkout"],
 *     validate: (value) => ({
 *       valid: value > 5,
 *       key: "totalPrice",
 *       message: "Total price is invalid"
 *     })
 *   })
 *   price: number;
 * }
 * ```
 */
export const create = <T>(
  props:
    | API.Validation.Evaluator<T>
    | {
        validate: API.Validation.Evaluator<T>;
        groups?: string | string[];
      }
) => {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    validate: "validate" in props ? props.validate : props,
    groups:
      "groups" in props
        ? Array.isArray(props.groups)
          ? props.groups
          : props.groups
          ? [props.groups]
          : []
        : [],
  });
};
