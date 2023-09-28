import ValidatorService from "../../src/decorators/service/validator.service";
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
        isValid: Validation.Evaluator<T>;
        groups?: Validation.GroupsParam;
      }
) => {
  return ValidatorService.create<T>({
    isValid: "isValid" in props ? props.isValid : props,
    groups: "isValid" in props ? props.groups : [],
  });
};

export default validate;
