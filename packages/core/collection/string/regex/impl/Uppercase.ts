import API from "api";

import { translate } from "../../../../src/localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";

/**
 * Creates a validator decorator that checks if a string value contains only uppercase letters using a regular expression pattern.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props.key - (Optional) The key to identify this validation rule in error messages. Defaults to "Uppercase".
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @param props.groups - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class MyClass {
 *   //@Uppercase()
 *   myText: string;
 * }
 *
 * // Example 2: Custom error message and validation groups
 * class AnotherClass {
 *   //@Uppercase({
 *   //   key: "UpperCaseText",
 *   //   message: "Invalid uppercase text",
 *   //   groups: ["registration", "profile"],
 *   // })
 *   text: string;
 * }
 */
export function Uppercase<T extends API.Utilities.Objects.Optional<string>>(
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: API.Decorator.key(options, "Uppercase"),
      valid: testRegex(RegexConst.UPPERCASE, value),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "Uppercase")
      ),
    }),
    API.Decorator.groups(options)
  );
}
