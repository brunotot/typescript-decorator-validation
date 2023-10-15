import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/**
 * ValueMin decorator for validating that a numeric value is greater than or equal to a specified minimum value.
 *
 * @typeParam T - The type of the value to be validated, which should be optional and a number.
 *
 * @returns A decorator function that can be applied to class properties.
 *
 * @example
 * // Usage with a specific minimum value:
 * class Product {
 *   //@ValueMin({ value: 10 })
 *   quantity?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@ValueMin({
 *   //  value: 5,
 *   //  message: "Quantity must be at least 5 units.",
 *   //})
 *   quantity?: number;
 * }
 */
export function ValueMin<T extends API.Utilities.Objects.Optional<number>>(
  min: number,
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _, locale) => ({
      key: API.Decorator.key(options, "ValueMin"),
      valid: value == null ? true : value >= min,
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "ValueMin", min, value)
      ),
    }),
    API.Decorator.groups(options)
  );
}
