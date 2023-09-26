import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/error-messages";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Decorator for validating that a value is a negative number.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * @example
 * ```typescript
 * class FinancialRecord {
 *   //@Negative
 *   debt: number;
 * }
 * ```
 * This example applies the `Negative` validator to the `debt` property to ensure it is a negative number.
 */
export default function Negative<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (num) => ({
      key: "Negative",
      message: extractMessage(props, ErrorMessage.Negative(num!)),
      valid: num !== undefined && num !== null && num < 0,
    }),
  });
}
