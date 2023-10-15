import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/**
 * Decorator for validating that an array falls within a specified size range.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.min - The minimum number of elements the array must have.
 * @param props.max - The maximum number of elements the array must have.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArraySizeRange<number>({ min: 2, max: 5, groups: ["group1"], message: "Array size must be between 2 and 5" })
 *   myArray: number[];
 * }
 * ```
 * This example validates that the `myArray` property has a size between 2 and 5 elements, associates it with a custom validation group, and provides a custom error message if the validation fails.
 */
export function ArraySizeRange<K, T extends K[]>(
  min: number,
  max: number,
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _, locale) => ({
      key: API.Decorator.key(options, "ArraySizeRange"),
      valid: (array ?? []).length >= min && (array ?? []).length <= max,
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "ArraySizeRange", min, max, (array ?? []).length)
      ),
    }),
    API.Decorator.groups(options)
  );
}
