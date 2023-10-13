import API from "api";

/**
 * Creates a validator decorator for minimum length validation.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - An object with the minimum length value.
 * @param props.value - The minimum length required.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with a minimum length of 5
 * class User {
 *   //@MinLength({ value: 5 })
 *   username: string;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class SecureUser {
 *   //@MinLength({
 *   //   value: 8,
 *   //   message: "Username must be at least 8 characters long",
 *   // })
 *   username: string;
 * }
 */
export function MinLength<T extends API.Utilities.Objects.Optional<string>>(
  min: number,
  config?: API.Decorator.Props.Base<"message-optional">
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: "MinLength",
      message: API.Decorator.message(config?.message, locale, "MinLength", min),
      valid: (value ?? "").length >= min,
    }),
    config
  );
}
