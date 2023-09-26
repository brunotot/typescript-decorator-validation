import makeValidator from "../../src/decorators/decorator.facade";
import Decorator from "../../src/types/namespace/decorator.namespace";

import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/error-messages";

/**
 * Decorator for validating that an array has an exact number of elements.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.value - The exact number of elements the array should have.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArraySizeExact<number>({ value: 3, groups: ["group1"], message: "Array must have exactly 3 elements" })
 *   myArray: number[];
 * }
 * ```
 * This example validates that the `myArray` property has exactly 3 elements, associates it with a custom validation group, and provides a custom error message if the validation fails.
 */
export default function ArraySizeExact<K, T extends K[]>(
  props: Decorator.PartialProps<
    number,
    {
      value: number;
    }
  >
) {
  const exact = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArraySizeExact",
      message: extractMessage(
        props,
        ErrorMessage.ArraySizeExact(exact, (array ?? []).length)
      ),
      valid: (array ?? []).length === exact,
    }),
  });
}
