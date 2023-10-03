import Decorator from "../../../../src/decorators";
import FieldValidatorDecorator from "../../../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../../../src/localization/service/translation.service";
import $ from "../../../../src/types";
import RegexConst from "../../../shared/regex.constants";
import { testRegex } from "../Pattern";

/**
 * Creates a validator decorator that checks if a string value contains only alphabetical characters (letters).
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - (Optional) An object with properties for the validator.
 * @param props.key - (Optional) The key to identify this validation rule in error messages. Defaults to "Alpha".
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @param props.groups - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class MyClass {
 *   @Alpha()
 *   name: string;
 * }
 *
 * // Example 2: Custom error message and validation groups
 * class AnotherClass {
 *   @Alpha({
 *     key: "AlphaName",
 *     message: "Invalid name format",
 *     groups: ["registration", "profile"],
 *   })
 *   fullName: string;
 * }
 */
export default function Alpha<T extends $.Objects.Optional<string>>(
  props?: Decorator.PartialProps
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Alpha",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "Alpha"),
        locale
      ),
      valid: testRegex(RegexConst.ALPHA, value),
    }),
  });
}

// SAMO PONAVLJAJ OVO ZA SVE OSTALE STRING VALIDATORE

// DUGOROCNA IDEJA JE SVAKI VALIDATOR SVEST NA TO
// znaci bez errorsMessages-a, to uopce ne bi postojalo
