import API from "api";

/**
 * ValueRange decorator for validating that a numeric value falls within a specified range.
 *
 * @param props - Properties to configure the decorator, including the minimum and maximum values.
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
  config?: API.Decorator.Props.Base<"message-optional">
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _, locale) => ({
      key: "ValueRange",
      valid: value == null ? true : value >= min && value <= max,
      message: API.Decorator.message(
        config?.message,
        locale,
        "ValueRange",
        min,
        max,
        value
      ),
    }),
    config
  );
}
