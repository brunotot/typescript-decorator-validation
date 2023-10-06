import API from "api";

/**
 * Decorator for validating that a value is an integer.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Order {
 *   //@Integer()
 *   quantity: number;
 * }
 * ```
 * This example applies the `Integer` validator to the `quantity` property to ensure it is an integer.
 */
export default function Integer<
  T extends API.Utilities.Objects.Optional<number>
>(props?: API.Decorator.Props.ZeroArgsMessageOptional) {
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (num, _, locale) => ({
      key: "Integer",
      message: API.Decorator.message(
        props,
        API.Localization.TranslationService.translate(locale, "Integer", num!),
        locale
      ),
      valid: num !== undefined && num !== null && Number.isInteger(num),
    }),
  });
}
