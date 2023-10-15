import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/**
 * Decorator for validating that every element in an array passes a specified test.
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
 *   //@ArrayEvery<number>({ test: (val) => val > 0, groups: ["group1"], message: "All elements must be greater than 0" })
 *   positiveNumbers: number[];
 * }
 * ```
 * This example validates that all elements in the `positiveNumbers` array are greater than 0, associates it with a custom validation group, and provides a custom error message if the validation fails.
 */
export function ArrayEvery<K, T extends K[]>(
  predicate: API.Utilities.Objects.ArrayPredicate<K>,
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.key(options, "ArrayEvery"),
      valid: (array ?? []).every(predicate),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "ArrayEvery")
      ),
    }),
    API.Decorator.groups(options)
  );
}
