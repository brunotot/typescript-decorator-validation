import {
  extractGroups,
  extractMessage,
} from "../../../../src/decorators/decorator.utils";
import ErrorMessage from "../../../../src/messages/models/error-messages";
import RegexConst from "../../../../src/models/regex.constants";
import $ from "../../../../src/types";
import Decorator from "../../../../src/types/namespace/decorator.namespace";
import Pattern from "../Pattern";

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
export default function Alphanumeric<T extends $.Objects.Optional<string>>(
  props?: Decorator.PartialProps
) {
  return Pattern<T>({
    key: "Alphanumeric",
    regex: RegexConst.ALPHANUMERIC,
    groups: extractGroups(props),
    message: extractMessage(props, ErrorMessage.Alphanumeric()),
  });
}
