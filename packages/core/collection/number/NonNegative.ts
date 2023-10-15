import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/**
 * NonNegative decorator for validating that a numeric value is non-negative.
 *
 * @param props - Optional properties to configure the decorator.
 *
 * @typeParam T - The type of the value to be validated, which should be optional and a number.
 *
 * @returns A decorator function that can be applied to class properties.
 *
 * @example
 * // Basic usage without args:
 * class Product {
 *   //@NonNegative()
 *   price?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@NonNegative({
 *   //  message: "Price must be a non-negative value.",
 *   //})
 *   price?: number;
 * }
 */
export function NonNegative<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (num, _, locale) => ({
      key: API.Decorator.key(options, "NonNegative"),
      valid: num !== undefined && num !== null && num >= 0,
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "NonNegative", num)
      ),
    }),
    API.Decorator.groups(options)
  );
}
