import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/**
 * Decorator for validating that a value is an integer.
 *
 * @typeParam T - The type of the value property.
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
export function Integer<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (num, _context, locale) => ({
      key: API.Decorator.key(options, "Integer"),
      valid: num !== undefined && num !== null && Number.isInteger(num),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "Integer", num)
      ),
    }),
    API.Decorator.groups(options)
  );
}
