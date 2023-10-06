import API from "api";

/**
 * Creates a validator decorator for required value validation.
 *
 * @typeparam T - The type of the decorated property (optional).
 * @param props - (Optional) An object with an optional custom error message.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage to validate if a value is required (not falsy)
 * class UserProfile {
 *   //@Required()
 *   fullName: string;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class Product {
 *   //@Required({ message: "Product name is mandatory" })
 *   name: string;
 * }
 */
export default function Required<T extends API.Utilities.Objects.Optional>(
  props?: API.Decorator.Props.ZeroArgsMessageOptional
) {
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Required",
      message: API.Decorator.message(
        props,
        API.Localization.TranslationService.translate(locale, "Required"),
        locale
      ),
      valid: API.Utilities.Objects.hasValue(value),
    }),
  });
}
