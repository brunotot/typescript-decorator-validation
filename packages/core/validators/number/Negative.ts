import API from "api";

/**
 * Decorator for validating that a value is a negative number.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * @example
 * ```typescript
 * class FinancialRecord {
 *   //@Negative
 *   debt: number;
 * }
 * ```
 * This example applies the `Negative` validator to the `debt` property to ensure it is a negative number.
 */
export default function Negative<
  T extends API.Utilities.Objects.Optional<number>
>(props?: API.Decorator.Props.ZeroArgsMessageOptional) {
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (num, _, locale) => ({
      key: "Negative",
      message: API.Decorator.message(
        props,
        API.Localization.TranslationService.translate(locale, "Negative", num!),
        locale
      ),
      valid: num !== undefined && num !== null && num < 0,
    }),
  });
}
