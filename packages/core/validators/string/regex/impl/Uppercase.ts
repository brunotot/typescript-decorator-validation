import Decorator from "../../../../src/decorators";
import ParamsExtractorService from "../../../../src/decorators/service/params-extractor.service";
import ValidatorService from "../../../../src/decorators/service/validator.service";
import TranslationService from "../../../../src/localization/service/translation.service";
import $ from "../../../../src/types";
import RegexConst from "../../../shared/regex.constants";
import { testRegex } from "../Pattern";

/**
 * Creates a validator decorator that checks if a string value contains only uppercase letters using a regular expression pattern.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - (Optional) An object with properties for the validator.
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
export default function Uppercase<T extends $.Objects.Optional<string>>(
  props?: Decorator.PartialProps
) {
  return ValidatorService.create<T>({
    groups: ParamsExtractorService.groups(props),
    isValid: (value, _, locale) => ({
      key: "Uppercase",
      message: ParamsExtractorService.message(
        props,
        TranslationService.translate(locale, "Uppercase"),
        locale
      ),
      valid: testRegex(RegexConst.UPPERCASE, value),
    }),
  });
}
