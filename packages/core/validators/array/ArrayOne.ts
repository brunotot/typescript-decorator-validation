import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import $ from "../../src/types";

/**
 * Decorator for validating that exactly one element in an array passes a specified test.
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
 *   //@ArrayOne<number>({ test: (val) => val === 0, groups: ["group1"], message: "Exactly one element must be zero" })
 *   zeroElement: number[];
 * }
 * ```
 * This example validates that exactly one element in the `zeroElement` array is zero, associates it with a custom validation group, and provides a custom error message if the validation fails.
 */
export default function ArrayOne<K, T extends K[]>(
  props: Decorator.ImpartialProps<{
    test: $.Objects.ArrayPredicate<K>;
  }>
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    isValid: (array, _, locale) => ({
      key: "ArrayOne",
      message: Decorator.message(props, "", locale),
      valid: (array ?? []).filter(props.test).length === 1,
    }),
  });
}
