import API from "api";

/**
 * Decorator for validating that an array is empty.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties (optional).
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArrayEmpty<number>({ groups: ["group1"], message: "Array must be empty" })
 *   emptyArray: number[];
 * }
 * ```
 * This example validates that the `emptyArray` is an empty array and associates it with a custom validation group and a custom error message.
 */
export function ArrayEmpty<K, T extends K[]>(
  message?: string,
  config?: API.Decorator.Props.Base
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: "ArrayEmpty",
      message: API.Decorator.message(message, locale, "ArrayEmpty"),
      valid: (array ?? []).length === 0,
    }),
    config
  );
}
