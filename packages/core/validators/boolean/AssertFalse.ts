import API from "api";

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
export function AssertFalse<T extends boolean>(
  props?: API.Decorator.Props.ZeroArgsMessageOptional
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "AssertFalse",
      valid: !value,
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "AssertFalse"
        ),
        locale
      ),
    }),
  });
}
