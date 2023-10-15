import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/**
 * ValueMax decorator for validating that a numeric value is less than or equal to a specified maximum value.
 *
 * @param props - Properties to configure the decorator, including the maximum value.
 *
 * @typeParam T - The type of the value to be validated, which should be optional and a number.
 *
 * @returns A decorator function that can be applied to class properties.
 *
 * @example
 * // Usage with a specific maximum value:
 * class Product {
 *   //@ValueMax({ value: 100 })
 *   price?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@ValueMax({
 *   //  value: 50,
 *   //  message: "Price must not exceed $50.",
 *   //})
 *   price?: number;
 * }
 */
export function ValueMax<T extends API.Utilities.Objects.Optional<number>>(
  max: number,
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _, locale) => ({
      key: API.Decorator.key(options, "ValueMax"),
      valid: value == null ? true : value <= max,
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "ValueMax", max, value)
      ),
    }),
    API.Decorator.groups(options)
  );
}
