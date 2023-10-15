import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

function validateDigits(
  number: number | undefined | null,
  _maxInteger: number | undefined,
  _maxFraction: number | undefined,
  locale: API.Localization.Resolver.LocaleResolver.Locale
): boolean {
  const maxInteger = _maxInteger ?? Infinity;
  const maxFraction = _maxFraction ?? Infinity;
  if (number == null) {
    return true;
  }
  if (
    (maxInteger !== Infinity && maxInteger % 1 !== 0) ||
    (maxFraction !== Infinity && maxFraction % 1 !== 0)
  ) {
    throw new Error(
      translate(locale, "InvalidDigits", maxInteger, maxFraction)
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
 * @param maxInteger - Max number of left-side (integer part) digits.
 * @param maxFraction - Max number of right-side (fraction part) digits.
 * @param options - Extra configuration props.
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
export function Digits<T extends API.Utilities.Objects.Optional<number>>(
  maxInteger?: number,
  maxFraction?: number,
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _, locale) => ({
      key: API.Decorator.key(options, "Digits"),
      valid: validateDigits(value, maxInteger, maxFraction, locale),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "Digits", maxInteger, maxFraction)
      ),
    }),
    API.Decorator.groups(options)
  );
}
