import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Decorator for validating that a value is an integer.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Order {
 *   //@Integer()
 *   quantity: number;
 * }
 * ```
 * This example applies the `Integer` validator to the `quantity` property to ensure it is an integer.
 */
export default function Integer<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (num) => ({
      key: "Integer",
      message: extractMessage(props, ErrorMessage.Integer(num!)),
      valid: num !== undefined && num !== null && Number.isInteger(num),
    }),
  });
}
