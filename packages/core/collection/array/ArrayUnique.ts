import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

function isArrayUnique<T>(
  arr: T[],
  equals: API.Utilities.Objects.Equals<T>
): boolean {
  const set = new Set<T>();
  for (const val of arr) {
    for (const el of set) {
      if (equals(val, el)) {
        return false;
      }
    }
    set.add(val);
  }
  return true;
}

/**
 * Decorator for validating that all elements in an array are unique based on a custom comparison function.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.hash - The custom hash function to determine uniqueness (optional). Defaults to using the default hash function.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArrayUnique<string>({ hash: (value) => value.toLowerCase(), message: "Values must be unique ignoring case" })
 *   names: string[];
 * }
 * ```
 * This example validates that all elements in the `names` array are unique when compared using a case-insensitive hash function and provides a custom error message if the validation fails.
 */
export function ArrayUnique<K, T extends K[]>(options?: API.Decorator.Options) {
  const hashFn = API.Utilities.Objects.hash;
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.key(options, "ArrayUnique"),
      valid: isArrayUnique(
        array ?? [],
        (obj1, obj2) => hashFn(obj1) === hashFn(obj2)
      ),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "ArrayUnique")
      ),
    }),
    API.Decorator.groups(options)
  );
}
