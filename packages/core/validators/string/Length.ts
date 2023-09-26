import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/error-messages";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Creates a validator decorator for length range validation.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - An object with minimum and maximum length values.
 * @param props.min - The minimum length allowed.
 * @param props.max - The maximum length allowed.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with a length range of 5 to 10 characters
 * class User {
 *   //@Length({ min: 5, max: 10 })
 *   password: string;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class SecureUser {
 *   //@Length({
 *   //   min: 8,
 *   //   max: 15,
 *   //   message: "Password length must be between 8 and 15 characters",
 *   // })
 *   password: string;
 * }
 */
export default function Length<T extends $.Objects.Optional<string>>(
  props: Decorator.ImpartialProps<{
    min: number;
    max: number;
  }>
) {
  const { min, max } = props;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Length",
      message: extractMessage(props, ErrorMessage.RangeLength(min, max)),
      valid: (value ?? "").length >= min && (value ?? "").length <= max,
    }),
  });
}
