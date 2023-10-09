import API from "api";

import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";
/**
 * Creates a validator decorator that checks if a string value contains only alphanumeric characters (letters and digits).
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - (Optional) An object with properties for the validator.
 * @param props.key - (Optional) The key to identify this validation rule in error messages. Defaults to "Alphanumeric".
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @param props.groups - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class MyClass {
 *   @Alphanumeric()
 *   code: string;
 * }
 *
 * // Example 2: Custom error message and validation groups
 * class AnotherClass {
 *   @Alphanumeric({
 *     key: "AlphanumericCode",
 *     message: "Invalid code format",
 *     groups: ["registration", "profile"],
 *   })
 *   value: string;
 * }
 */
export function Alphanumeric<T extends API.Utilities.Objects.Optional<string>>(
  props?: API.Decorator.Props.ZeroArgsMessageOptional
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Alphanumeric",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "Alphanumeric"
        ),
        locale
      ),
      valid: testRegex(RegexConst.ALPHANUMERIC, value),
    }),
  });
}
