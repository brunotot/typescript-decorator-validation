import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import Objects from "../../src/utilities/impl/Objects";

/**
 * Creates a validator decorator for maximum length validation.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - An object with the maximum length value.
 * @param props.value - The maximum length allowed.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with a maximum length of 10
 * class User {
 *   //@MaxLength({ value: 10 })
 *   username: string;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class SecureUser {
 *   //@MaxLength({
 *   //   value: 15,
 *   //   message: "Username cannot exceed 15 characters",
 *   // })
 *   username: string;
 * }
 */
export default function MaxLength<T extends Objects.Optional<string>>(
  props: Decorator.Props.MultiArgsMessageOptional<number>
) {
  const max = Decorator.args(props);
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "MaxLength",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "MaxLength", max),
        locale
      ),
      valid: (value ?? "").length <= max,
    }),
  });
}
