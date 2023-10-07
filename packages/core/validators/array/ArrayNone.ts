import API from "api";

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
export function ArrayNone<K, T extends K[]>(
  props: API.Decorator.Props.MultiArgsMessageRequired<
    API.Utilities.Objects.ArrayPredicate<K>
  >
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (array, _, locale) => ({
      key: "ArrayNone",
      message: API.Decorator.message(props, "", locale),
      valid: !(array ?? []).some(props.value),
    }),
  });
}
