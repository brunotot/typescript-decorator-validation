import API from "api";

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
export function ArraySome<K, T extends K[]>(
  props: API.Decorator.Props.MultiArgsMessageRequired<
    API.Utilities.Objects.ArrayPredicate<K>
  >
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (array, _, locale) => ({
      key: "ArraySome",
      message: API.Decorator.message(props, "", locale),
      valid: (array ?? []).some(props.value),
    }),
  });
}
