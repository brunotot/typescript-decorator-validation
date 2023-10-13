import API from "api";

/**
 * Positive decorator for validating that a numeric value is positive.
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
 *   @Positive()
 *   quantity?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   @Positive({
 *     message: "Quantity must be a positive value.",
 *   })
 *   quantity?: number;
 * }
 */
export function Positive<T extends API.Utilities.Objects.Optional<number>>(
  message?: string,
  config?: API.Decorator.Props.Base
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (num, _, locale) => ({
      key: "Positive",
      valid: num !== undefined && num !== null && num > 0,
      message: API.Decorator.message(message, locale, "Positive", num),
    }),
    config
  );
}
