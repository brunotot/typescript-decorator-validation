import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Creates a validator decorator for required value validation.
 *
 * @typeparam T - The type of the decorated property (optional).
 * @param props - (Optional) An object with an optional custom error message.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage to validate if a value is required (not falsy)
 * class UserProfile {
 *   //@Required()
 *   fullName: string;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class Product {
 *   //@Required({ message: "Product name is mandatory" })
 *   name: string;
 * }
 */
export default function Required<T extends $.Objects.Optional>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Required",
      message: extractMessage(props, ErrorMessage.Required()),
      valid: $.Objects.hasValue(value),
    }),
  });
}
