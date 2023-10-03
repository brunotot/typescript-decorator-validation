import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import Validation from "../../src/types/namespace/validation.namespace";

/**
 * A function which returns a decorated validator function built from a custom handler
 *
 * @typeparam T - The type of the decorated property.
 * @param props - An object with a custom validation function or a validation function directly.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with a custom validation function
 * class Order {
 *   //@Rule((value) => value.price > 0)
 *   totalPrice: number;
 * }
 *
 * @example
 * // Example 2: Using an object with validation function and groups
 * class Product {
 *   //@Rule({
 *   //  isValid: (value) => value.price > 0,
 *   //  roups: ["checkout"],
 *   //)
 *   price: number;
 * }
 */
const validate = <T>(
  props:
    | Validation.Evaluator<T>
    | {
        validate: Validation.Evaluator<T>;
        groups?: string | string[];
      }
) => {
  return FieldValidatorDecorator.build<T>({
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

export default validate;
