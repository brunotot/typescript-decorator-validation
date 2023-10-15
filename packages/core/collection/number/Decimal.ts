import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/**
 * Decorator for validating if a value is a decimal number.
 *
 * @typeParam T - The type of the value property.
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
export function Decimal<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: API.Decorator.key(options, "Decimal"),
      valid: value !== undefined && value !== null && !Number.isInteger(value),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "Decimal", value)
      ),
    }),
    API.Decorator.groups(options)
  );
}
