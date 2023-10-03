import Decorator from "../../../../src/decorators";
import FieldValidatorDecorator from "../../../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../../../src/localization/service/translation.service";
import $ from "../../../../src/types";
import RegexConst from "../../../shared/regex.constants";
import { testRegex } from "./../../regex/Pattern";

/**
 * Creates a validator decorator that checks if a string value is a valid IP address using a regular expression pattern.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - (Optional) An object with properties for the validator.
 * @param props.key - (Optional) The key to identify this validation rule in error messages. Defaults to "IPAddress".
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @param props.groups - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class MyClass {
 *   //@IPAddress()
 *   ipAddress: string;
 * }
 *
 * // Example 2: Custom error message and validation groups
 * class AnotherClass {
 *   //@IPAddress({
 *   //   key: "IPAddressField",
 *   //   message: "Invalid IP address",
 *   //   groups: ["registration", "profile"],
 *   // })
 *   value: string;
 * }
 */
export default function IPAddress<T extends $.Objects.Optional<string>>(
  props?: Decorator.PartialProps
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "IPAddress",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "IPAddress"),
        locale
      ),
      valid: testRegex(RegexConst.IP_ADDRESS, value),
    }),
  });
}
