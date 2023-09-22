import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Creates a decorator to validate that a value is truthy.
 *
 * @typeparam T - The type of the decorated property.
 * @param props - Optional properties for configuring the validator.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage
 * class User {
 *   //@Truthy()
 *   isActive: boolean;
 * }
 *
 * @example
 * // Example 2: Using a custom error message
 * class Product {
 *   //@Truthy({ message: "Product must be available." })
 *   available: boolean;
 * }
 */
export default function Truthy<T extends $.Objects.Optional>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Truthy",
      message: extractMessage(props, ErrorMessage.Truthy()),
      valid: !!value,
    }),
  });
}
