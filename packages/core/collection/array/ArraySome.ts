import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

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
  predicate: API.Utilities.Objects.ArrayPredicate<K>,
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.key(options, "ArraySome"),
      valid: (array ?? []).some(predicate),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "ArraySome")
      ),
    }),
    API.Decorator.groups(options)
  );
}
