import Decorator from "../../src/decorators";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ValidatorService from "../../src/decorators/service/validator.service";
import $ from "../../src/types";

/**
 * Decorator for validating that every element in an array passes a specified test.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.test - A predicate function to test each element in the array.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArrayEvery<number>({ test: (val) => val > 0, groups: ["group1"], message: "All elements must be greater than 0" })
 *   positiveNumbers: number[];
 * }
 * ```
 * This example validates that all elements in the `positiveNumbers` array are greater than 0, associates it with a custom validation group, and provides a custom error message if the validation fails.
 */
export default function ArrayEvery<K, T extends K[]>(
  props: Decorator.ImpartialProps<{
    test: $.Objects.ArrayPredicate<K>;
  }>
) {
  return ValidatorService.create<T>({
    groups: extractGroups(props),
    isValid: (array, _, locale) => ({
      key: "ArrayEvery",
      message: extractMessage(props, "", locale),
      valid: (array ?? []).every(props.test),
    }),
  });
}
