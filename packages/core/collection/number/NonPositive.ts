import API from "api";

/**
 * NonPositive decorator for validating that a numeric value is non-positive.
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
  props?: API.Decorator.Props.ZeroArgsMessageOptional
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (num, _, locale) => ({
      key: "NonPositive",
      valid: num !== undefined && num !== null && num <= 0,
      message: API.Decorator.message(props, locale, "NonPositive", num),
    }),
  });
}
