import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Creates a validator decorator for falsy value validation.
 *
 * @typeparam T - The type of the decorated property (optional).
 * @param props - (Optional) An object with an optional custom error message.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage to validate if a value is falsy
 * class User {
 *   //@Falsy()
 *   isActive: boolean;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class AppConfig {
 *   //@Falsy({ message: "App is not disabled" })
 *   isDisabled: boolean;
 * }
 */
export default function Falsy<T extends $.Objects.Optional>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Falsy",
      message: extractMessage(props, ErrorMessage.Falsy()),
      valid: !value,
    }),
  });
}
