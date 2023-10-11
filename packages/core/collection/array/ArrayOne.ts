import API from "api";

/**
 * Decorator for validating that exactly one element in an array passes a specified test.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.value - A predicate function to value each element in the array.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArrayOne<number>({ value: (val) => val === 0, groups: ["group1"], message: "Exactly one element must be zero" })
 *   zeroElement: number[];
 * }
 * ```
 * This example validates that exactly one element in the `zeroElement` array is zero, associates it with a custom validation group, and provides a custom error message if the validation fails.
 */
export function ArrayOne<K, T extends K[]>(
  props: API.Decorator.Props.MultiArgsMessageRequired<
    API.Utilities.Objects.ArrayPredicate<K>
  >
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (array, _, locale) => ({
      key: "ArrayOne",
      message: API.Decorator.message(props, locale, null),
      valid: (array ?? []).filter(props.value).length === 1,
    }),
  });
}
