import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

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
export function Negative<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (num, _context, locale) => ({
      key: API.Decorator.key(options, "Negative"),
      valid: num !== undefined && num !== null && num < 0,
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "Negative", num)
      ),
    }),
    API.Decorator.groups(options)
  );
}
