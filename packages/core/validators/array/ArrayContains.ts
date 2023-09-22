import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Decorator for validating that an array contains a specific value.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.value - The value to check for in the array.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArrayContains<number>({ value: 42, groups: ["group1", "group2"], message: "Invalid value" })
 *   numbers: number[];
 * }
 * ```
 * This example validates that the `numbers` array contains the value 42 and associates it with custom validation groups and a custom error message.
 */
export default function ArrayContains<K, T extends K[]>(
  props: Decorator.PartialProps<
    {
      value: K;
    },
    {
      value: K;
    }
  >
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArrayContains",
      message: extractMessage(props, ErrorMessage.ArrayContains(props.value)),
      valid: ((array ?? []) as any[]).includes(props.value),
    }),
  });
}
