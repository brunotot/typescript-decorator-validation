import API from "api";

/**
 * ValueMin decorator for validating that a numeric value is greater than or equal to a specified minimum value.
 *
 * @param props - Properties to configure the decorator, including the minimum value.
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
export default function ValueMin<
  T extends API.Utilities.Objects.Optional<number>
>(props: API.Decorator.Props.MultiArgsMessageOptional<number>) {
  const min = API.Decorator.args(props);
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "ValueMin",
      message: API.Decorator.message(
        props,
        API.Localization.TranslationService.translate(
          locale,
          "ValueMin",
          min,
          value!
        ),
        locale
      ),
      valid: value == null ? true : value >= min,
    }),
  });
}
