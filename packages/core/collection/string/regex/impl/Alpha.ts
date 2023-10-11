import API from "api";

import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";
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
export function Alpha<T extends API.Utilities.Objects.Optional<string>>(
  props?: API.Decorator.Props.ZeroArgsMessageOptional
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Alpha",
      message: API.Decorator.message(props, locale, "Alpha"),
      valid: testRegex(RegexConst.ALPHA, value),
    }),
  });
}

// SAMO PONAVLJAJ OVO ZA SVE OSTALE STRING VALIDATORE

// DUGOROCNA IDEJA JE SVAKI VALIDATOR SVEST NA TO
// znaci bez errorsMessages-a, to uopce ne bi postojalo
