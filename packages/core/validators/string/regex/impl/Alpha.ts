import {
  extractGroups,
  extractMessage,
} from "../../../../src/decorators/decorator.utils";
import ErrorMessage from "../../../../src/messages/models/errors";
import RegexConst from "../../../../src/models/regex.constants";
import $ from "../../../../src/types";
import Decorator from "../../../../src/types/namespace/decorator.namespace";
import Pattern from "../Pattern";

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
  return Pattern<T>({
    key: "Alpha",
    regex: RegexConst.ALPHA,
    groups: extractGroups(props),
    message: extractMessage(props, ErrorMessage.Alpha()),
  });
}
