import API from "api";

/**
 * Creates a validator decorator for length range validation.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - An object with minimum and maximum length values.
 * @param props.min - The minimum length allowed.
 * @param props.max - The maximum length allowed.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with a length range of 5 to 10 characters
 * class User {
 *   //@Length({ min: 5, max: 10 })
 *   password: string;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class SecureUser {
 *   //@Length({
 *   //   min: 8,
 *   //   max: 15,
 *   //   message: "Password length must be between 8 and 15 characters",
 *   // })
 *   password: string;
 * }
 */
export function Length<T extends API.Utilities.Objects.Optional<string>>(
  props: API.Decorator.Props.MultiArgsMessageOptional<readonly [number, number]>
) {
  const [min, max] = API.Decorator.args(props);
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Length",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "RangeLength",
          min,
          max
        ),
        locale
      ),
      valid: (value ?? "").length >= min && (value ?? "").length <= max,
    }),
  });
}
