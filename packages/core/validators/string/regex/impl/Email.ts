import Decorator from "../../../../src/decorators";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/decorators/decorator.utils";
import ValidatorService from "../../../../src/decorators/service/validator.service";
import TranslationService from "../../../../src/localization/service/translation.service";
import RegexConst from "../../../../src/models/regex.constants";
import $ from "../../../../src/types";
import { testRegex } from "./../../regex/Pattern";

/**
 * Creates a validator decorator that checks if a string value is a valid email address using a regular expression pattern.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - (Optional) An object with properties for the validator.
 * @param props.key - (Optional) The key to identify this validation rule in error messages. Defaults to "Email".
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @param props.groups - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class MyClass {
 *   @Email()
 *   emailAddress: string;
 * }
 *
 * // Example 2: Custom error message and validation groups
 * class AnotherClass {
 *   @Email({
 *     key: "EmailField",
 *     message: "Invalid email address",
 *     groups: ["registration", "profile"],
 *   })
 *   value: string;
 * }
 */
export default function Email<T extends $.Objects.Optional<string>>(
  props?: Decorator.PartialProps
) {
  return ValidatorService.create<T>({
    groups: extractGroups(props),
    isValid: (value, _, locale) => ({
      key: "Email",
      message: extractMessage(
        props,
        TranslationService.translate(locale, "Email"),
        locale
      ),
      valid: testRegex(RegexConst.EMAIL, value),
    }),
  });
}
