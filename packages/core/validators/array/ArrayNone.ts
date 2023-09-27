import Decorator from "../../src/decorators";
import ParamsExtractorService from "../../src/decorators/service/params-extractor.service";
import ValidatorService from "../../src/decorators/service/validator.service";
import $ from "../../src/types";

/**
 * Decorator for validating that none of the elements in an array pass a specified test.
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
 *   //@ArrayNone<number>({ test: (val) => val < 0, groups: ["group1"], message: "None of the elements can be negative" })
 *   nonNegativeNumbers: number[];
 * }
 * ```
 * This example validates that none of the elements in the `nonNegativeNumbers` array are negative, associates it with a custom validation group, and provides a custom error message if the validation fails.
 */
export default function ArrayNone<K, T extends K[]>(
  props: Decorator.ImpartialProps<{
    test: $.Objects.ArrayPredicate<K>;
  }>
) {
  return ValidatorService.create<T>({
    groups: ParamsExtractorService.groups(props),
    isValid: (array, _, locale) => ({
      key: "ArrayNone",
      message: ParamsExtractorService.message(props, "", locale),
      valid: !(array ?? []).some(props.test),
    }),
  });
}
