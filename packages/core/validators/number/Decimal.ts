import makeValidator from "../../src/decorators/decorator.facade";
import Decorator from "../../src/types/namespace/decorator.namespace";

import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/error-messages";
import $ from "../../src/types";

/**
 * Decorator for validating if a value is a decimal number.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Product {
 *   //@Decimal()
 *   price: number;
 * }
 * ```
 * This example applies the `Decimal` validator to the `price` property to ensure it is a decimal number.
 */
export default function Decimal<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps<number>
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Decimal",
      message: extractMessage(props, ErrorMessage.Decimal(value!)),
      valid: value !== undefined && value !== null && !Number.isInteger(value),
    }),
  });
}
