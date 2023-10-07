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
export default function ValueRange<
  T extends API.Utilities.Objects.Optional<number>
>(
  props: API.Decorator.Props.MultiArgsMessageOptional<readonly [number, number]>
) {
  const [min, max] = API.Decorator.args(props);
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "ValueRange",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "ValueRange",
          min,
          max,
          value!
        ),
        locale
      ),
      valid: value == null ? true : value >= min && value <= max,
    }),
  });
}
