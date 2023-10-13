import API from "api";

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
export function ArraySizeExact<K, T extends K[]>(
  exact: number,
  config?: API.Decorator.Props.Base<"message-optional">
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: "ArraySizeExact",
      valid: (array ?? []).length === exact,
      message: API.Decorator.message(
        config?.message,
        locale,
        "ArraySizeExact",
        exact,
        (array ?? []).length
      ),
    }),
    config
  );
}
