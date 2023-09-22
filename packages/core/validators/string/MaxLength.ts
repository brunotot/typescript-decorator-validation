import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Creates a validator decorator for maximum length validation.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - An object with the maximum length value.
 * @param props.value - The maximum length allowed.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with a maximum length of 10
 * class User {
 *   //@MaxLength({ value: 10 })
 *   username: string;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class SecureUser {
 *   //@MaxLength({
 *   //   value: 15,
 *   //   message: "Username cannot exceed 15 characters",
 *   // })
 *   username: string;
 * }
 */
export default function MaxLength<T extends $.Objects.Optional<string>>(
  props: Decorator.PartialProps<number>
) {
  const max = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "MaxLength",
      message: extractMessage(props, ErrorMessage.MaxLength(max)),
      valid: (value ?? "").length <= max,
    }),
  });
}
