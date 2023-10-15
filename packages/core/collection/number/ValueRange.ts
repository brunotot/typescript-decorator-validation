import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/**
 * ValueRange decorator for validating that a numeric value falls within a specified range.
 *
 * @typeParam T - The type of the value to be validated, which should be optional and a number.
 *
 * @returns A decorator function that can be applied to class properties.
 *
 * @example
 * // Usage with a specific value range:
 * class Product {
 *   //@ValueRange({ min: 10, max: 100 })
 *   price?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@ValueRange({
 *   //  min: 5,
 *   //  max: 50,
 *   //  message: "Price must be between $5 and $50.",
 *   //})
 *   price?: number;
 * }
 */
export function ValueRange<T extends API.Utilities.Objects.Optional<number>>(
  min: number,
  max: number,
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _, locale) => ({
      key: API.Decorator.key(options, "ValueRange"),
      valid: value == null ? true : value >= min && value <= max,
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "ValueRange", min, max, value)
      ),
    }),
    API.Decorator.groups(options)
  );
}
