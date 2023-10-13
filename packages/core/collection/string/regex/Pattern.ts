import API from "api";

export function testRegex<T extends API.Utilities.Objects.Optional<string>>(
  regex: RegExp,
  value: T
): boolean {
  return (value ?? "").length === 0 || regex.test(value!);
}

/**
 * Creates a validator decorator that checks if a string value matches a regular expression pattern.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - An object with properties for the validator.
 * @param props.regex - The regular expression pattern to match against the value.
 * @param props.key - (Optional) The key to identify this validation rule in error messages. Defaults to "Pattern".
 * @param props.message - (Optional) The custom error message to display when validation fails.
 * @param props.groups - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class MyClass {
 *   @Pattern({ regex: /^[0-9]+$/ })
 *   myProperty: string;
 * }
 *
 * // Example 2: Custom error message and validation groups
 * class AnotherClass {
 *   @Pattern({
 *     regex: /^[A-Za-z]+$/,
 *     key: "AlphabeticPattern",
 *     message: "Must contain only alphabetic characters",
 *     groups: ["registration", "profile"],
 *   })
 *   anotherProperty: string;
 * }
 */
export function Pattern<T extends API.Utilities.Objects.Optional<string>>(
  regex: RegExp,
  message: string,
  key?: string,
  config?: API.Decorator.Props.Base
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, _locale) => ({
      key: key ?? "Pattern",
      message: API.Decorator.message(message),
      valid: testRegex(regex, value),
    }),
    config
  );
}
