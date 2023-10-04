import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import Objects from "../../src/utilities/impl/Objects";

/**
 * Creates a validator decorator for exact length validation.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - The exact length value or an object with the exact length value and an optional custom error message.
 * @param props.value - The exact length value to validate against.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with an exact length of 10 characters
 * class User {
 *   //@ExactLength(10)
 *   username: string;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class SecureUser {
 *   //@ExactLength({
 *   //   value: 8,
 *   //   message: "Username must be exactly 8 characters long",
 *   // })
 *   username: string;
 * }
 */
export default function ExactLength<T extends Objects.Optional<string>>(
  props: Decorator.Props.MultiArgsMessageOptional<number>
) {
  const exact = Decorator.args(props);
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "ExactLength",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "ExactLength", exact),
        locale
      ),
      valid: (value ?? "").length === exact,
    }),
  });
}
