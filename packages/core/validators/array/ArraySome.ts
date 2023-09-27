import Decorator from "../../src/decorators";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ValidatorService from "../../src/decorators/service/validator.service";
import $ from "../../src/types";

/**
 * Decorator for validating that at least one element in an array passes a specific test.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.test - The predicate function that each element in the array must satisfy.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArraySome<number>({ test: (value) => value > 0, message: "At least one positive number is required" })
 *   numbers: number[];
 * }
 * ```
 * This example validates that at least one element in the `numbers` array is greater than 0 and provides a custom error message if the validation fails.
 */
export default function ArraySome<K, T extends K[]>(
  props: Decorator.ImpartialProps<{
    test: $.Objects.ArrayPredicate<K>;
  }>
) {
  return ValidatorService.create<T>({
    groups: extractGroups(props),
    isValid: (array, _, locale) => ({
      key: "ArraySome",
      message: extractMessage(props, "", locale),
      valid: (array ?? []).some(props.test),
    }),
  });
}
