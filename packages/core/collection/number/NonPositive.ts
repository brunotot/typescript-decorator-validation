import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/**
 * NonPositive decorator for validating that a numeric value is non-positive.
 *
 * @typeParam T - The type of the value to be validated, which should be optional and a number.
 *
 * @returns A decorator function that can be applied to class properties.
 *
 * @example
 * // Basic usage without args:
 * class Product {
 *   //@NonPositive()
 *   discount?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@NonPositive({
 *   //  message: "Discount must be a non-positive value.",
 *   //})
 *   discount?: number;
 * }
 */
export function NonPositive<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (num, _context, locale) => ({
      key: API.Decorator.key(options, "NonPositive"),
      valid: num !== undefined && num !== null && num <= 0,
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "NonPositive", num)
      ),
    }),
    API.Decorator.groups(options)
  );
}
