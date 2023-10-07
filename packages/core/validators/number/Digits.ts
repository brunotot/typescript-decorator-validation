import API from "api";

function validateDigits(
  number: number,
  maxInteger: number,
  maxFraction: number,
  locale: API.Localization.Resolver.LocaleResolver.Locale
): boolean {
  if (number == null) {
    return true;
  }
  if (
    (maxInteger !== Infinity && maxInteger % 1 !== 0) ||
    (maxFraction !== Infinity && maxFraction % 1 !== 0)
  ) {
    throw new Error(
      API.Localization.Service.TranslationService.translate(
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
export default function Digits<
  T extends API.Utilities.Objects.Optional<number>
>(
  props: API.Decorator.Props.MultiArgsMessageOptional<{
    maxInteger?: number;
    maxFraction?: number;
  }>
) {
  const { maxInteger = Infinity, maxFraction = Infinity } =
    API.Decorator.args(props);
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Digits",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "Digits",
          maxInteger,
          maxFraction
        ),
        locale
      ),
      valid: validateDigits(value!, maxInteger, maxFraction, locale),
    }),
  });
}
