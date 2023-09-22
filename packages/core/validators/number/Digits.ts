import makeValidator from "../../src/decorators/decorator.facade";
import Decorator from "../../src/types/namespace/decorator.namespace";

import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";

function validateDigits(
  number: number,
  maxInteger: number,
  maxFraction: number
): boolean {
  if (number == null) {
    return true;
  }
  if (
    (maxInteger !== Infinity && maxInteger % 1 !== 0) ||
    (maxFraction !== Infinity && maxFraction % 1 !== 0)
  ) {
    throw new Error(ErrorMessage.InvalidDigits(maxInteger, maxFraction));
  }

  const parts = number.toString().split(".");
  const integerPart = parts[0];
  const fractionPart = parts[1] || "";

  return integerPart.length <= maxInteger && fractionPart.length <= maxFraction;
}

/**
 * Decorator for validating the number of digits in a numeric value.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Product {
 *   //@Digits({ maxInteger: 4, maxFraction: 2 })
 *   price: number;
 * }
 * ```
 * This example applies the `Digits` validator to the `price` property to ensure it has at most 4 digits in the integer part and 2 digits in the fractional part.
 */
export default function Digits<T extends $.Objects.Optional<number>>(
  props: Decorator.PartialProps<
    {
      maxInteger?: number;
      maxFraction?: number;
    },
    {
      maxInteger?: number;
      maxFraction?: number;
    }
  >
) {
  const { maxInteger = Infinity, maxFraction = Infinity } = props;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Digits",
      message: extractMessage(
        props,
        ErrorMessage.Digits(maxInteger, maxFraction)
      ),
      valid: validateDigits(value!, maxInteger, maxFraction),
    }),
  });
}
