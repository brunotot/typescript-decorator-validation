import API from "api";

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
  message?: string,
  config?: API.Decorator.Props.Base
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (num, _, locale) => ({
      key: "NonNegative",
      valid: num !== undefined && num !== null && num >= 0,
      message: API.Decorator.message(message, locale, "NonNegative", num!),
    }),
    config
  );
}
