import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";

/**
 * Creates a validator decorator for falsy value validation.
 *
 * @typeparam T - The type of the decorated property (optional).
 * @param props - (Optional) An object with an optional custom error message.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage to validate if a value is falsy
 * class User {
 *   //@AssertFalse()
 *   isActive: boolean;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class AppConfig {
 *   //@AssertFalse({ message: "App is not disabled" })
 *   isDisabled: boolean;
 * }
 */
export default function AssertFalse<T extends boolean>(
  props?: Decorator.Props.ZeroArgsMessageOptional
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "AssertFalse",
      valid: !value,
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "AssertFalse"),
        locale
      ),
    }),
  });
}
