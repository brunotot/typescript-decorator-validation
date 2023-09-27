import Decorator from "../../src/decorators";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ValidatorService from "../../src/decorators/service/validator.service";
import Localization from "../../src/localization";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

function validateDigits(
  number: number,
  maxInteger: number,
  maxFraction: number,
  locale: Localization.Locale
): boolean {
  if (number == null) {
    return true;
  }
  if (
    (maxInteger !== Infinity && maxInteger % 1 !== 0) ||
    (maxFraction !== Infinity && maxFraction % 1 !== 0)
  ) {
    throw new Error(
      TranslationService.translate(
        locale,
        "InvalidDigits",
        maxInteger,
        maxFraction
      )
    );
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
  return ValidatorService.create<T>({
    groups: extractGroups(props),
    isValid: (value, _, locale) => ({
      key: "Digits",
      message: extractMessage(
        props,
        TranslationService.translate(locale, "Digits", maxInteger, maxFraction),
        locale
      ),
      valid: validateDigits(value!, maxInteger, maxFraction, locale),
    }),
  });
}
