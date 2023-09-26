import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/error-messages";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * ValueMin decorator for validating that a numeric value is greater than or equal to a specified minimum value.
 *
 * @param props - Properties to configure the decorator, including the minimum value.
 *
 * @typeParam T - The type of the value to be validated, which should be optional and a number.
 *
 * @returns A decorator function that can be applied to class properties.
 *
 * @example
 * // Usage with a specific minimum value:
 * class Product {
 *   //@ValueMin({ value: 10 })
 *   quantity?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@ValueMin({
 *   //  value: 5,
 *   //  message: "Quantity must be at least 5 units.",
 *   //})
 *   quantity?: number;
 * }
 */
export default function ValueMin<T extends $.Objects.Optional<number>>(
  props: Decorator.PartialProps<
    number,
    {
      value: number;
    }
  >
) {
  const min = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "ValueMin",
      message: extractMessage(props, ErrorMessage.ValueMin(min, value!)),
      valid: value == null ? true : value >= min,
    }),
  });
}
