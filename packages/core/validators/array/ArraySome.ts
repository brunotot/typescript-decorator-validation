import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import $ from "../../src/types";

/**
 * Decorator for validating that at least one element in an array passes a specific test.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.value - The predicate function that each element in the array must satisfy.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArraySome<number>({ value: (value) => value > 0, message: "At least one positive number is required" })
 *   numbers: number[];
 * }
 * ```
 * This example validates that at least one element in the `numbers` array is greater than 0 and provides a custom error message if the validation fails.
 */
export default function ArraySome<K, T extends K[]>(
  props: Decorator.Props.MultiArgsMessageRequired<$.Objects.ArrayPredicate<K>>
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (array, _, locale) => ({
      key: "ArraySome",
      message: Decorator.message(props, "", locale),
      valid: (array ?? []).some(props.value),
    }),
  });
}
