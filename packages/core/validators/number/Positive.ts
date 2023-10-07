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
export default function Positive<
  T extends API.Utilities.Objects.Optional<number>
>(props?: API.Decorator.Props.ZeroArgsMessageOptional) {
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (num, _, locale) => ({
      key: "Positive",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "Positive",
          num!
        ),
        locale
      ),
      valid: num !== undefined && num !== null && num > 0,
    }),
  });
}
