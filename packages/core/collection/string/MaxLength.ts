import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

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
export function MaxLength<T extends API.Utilities.Objects.Optional<string>>(
  max: number,
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: API.Decorator.key(options, "MaxLength"),
      valid: (value ?? "").length <= max,
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "MaxLength", max)
      ),
    }),
    API.Decorator.groups(options)
  );
}
