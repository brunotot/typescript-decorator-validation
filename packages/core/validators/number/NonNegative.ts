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
export default function NonNegative<
  T extends API.Utilities.Objects.Optional<number>
>(props?: API.Decorator.Props.ZeroArgsMessageOptional) {
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (num, _, locale) => ({
      key: "NonNegative",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "NonNegative",
          num!
        ),
        locale
      ),
      valid: num !== undefined && num !== null && num >= 0,
    }),
  });
}
