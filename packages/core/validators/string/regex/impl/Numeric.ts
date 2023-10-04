import Decorator from "../../../../src/decorators";
import FieldValidatorDecorator from "../../../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../../../src/localization/service/translation.service";
import Objects from "../../../../src/utilities/impl/Objects";
import RegexConst from "../../../shared/regex.constants";
import { testRegex } from "../Pattern";
/**
 * Creates a validator decorator that checks if a string value contains only numeric characters using a regular expression pattern.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - (Optional) An object with properties for the validator.
 * @param props.key - (Optional) The key to identify this validation rule in error messages. Defaults to "Numeric".
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @param props.groups - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class MyClass {
 *   //@Numeric()
 *   myNumber: string;
 * }
 *
 * // Example 2: Custom error message and validation groups
 * class AnotherClass {
 *   //@Numeric({
 *   //   key: "NumberField",
 *   //   message: "Invalid numeric input",
 *   //   groups: ["registration", "profile"],
 *   // })
 *   value: string;
 * }
 */
export default function Numeric<T extends Objects.Optional<string>>(
  props?: Decorator.Props.ZeroArgsMessageOptional
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Numeric",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "Numeric"),
        locale
      ),
      valid: testRegex(RegexConst.NUMERIC, value),
    }),
  });
}
