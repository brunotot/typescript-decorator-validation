import Decorator from "../../../../src/decorators";
import ParamsExtractorService from "../../../../src/decorators/service/params-extractor.service";
import ValidatorService from "../../../../src/decorators/service/validator.service";
import TranslationService from "../../../../src/localization/service/translation.service";
import RegexConst from "../../../../src/models/regex.constants";
import $ from "../../../../src/types";
import { testRegex } from "../Pattern";

/**
 * Creates a validator decorator that checks if a string value contains only lowercase letters using a regular expression pattern.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - (Optional) An object with properties for the validator.
 * @param props.key - (Optional) The key to identify this validation rule in error messages. Defaults to "Lowercase".
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @param props.groups - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class MyClass {
 *   //@Lowercase()
 *   myString: string;
 * }
 *
 * // Example 2: Custom error message and validation groups
 * class AnotherClass {
 *   //@Lowercase({
 *   //   key: "LowercaseField",
 *   //   message: "Invalid lowercase input",
 *   //   groups: ["registration", "profile"],
 *   // })
 *   value: string;
 * }
 */
export default function Lowercase<T extends $.Objects.Optional<string>>(
  props?: Decorator.PartialProps
) {
  return ValidatorService.create<T>({
    groups: ParamsExtractorService.groups(props),
    isValid: (value, _, locale) => ({
      key: "Lowercase",
      message: ParamsExtractorService.message(
        props,
        TranslationService.translate(locale, "Lowercase"),
        locale
      ),
      valid: testRegex(RegexConst.LOWERCASE, value),
    }),
  });
}
