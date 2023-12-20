import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";

/** ArrayUnique identifier. */
export const ARRAY_UNIQUE = "ArrayUnique";

/** Internal validation function for {@link ArrayUnique} validator. */
export function isArrayUniqueValid(array: any[]): boolean {
  API.Utilities.Objects.assertType("array", array);
  const hashFn = API.Utilities.Objects.hash;
  function isArrayUnique<T>(arr: T[], equals: API.Utilities.Objects.Equals<T>): boolean {
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
  return isArrayUnique(array ?? [], (obj1, obj2) => hashFn(obj1) === hashFn(obj2));
}

/**
 * Checks if all elements in decorated array are unique.
 *
 * @key {@link ARRAY_UNIQUE ArrayUnique}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayUnique()
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayUnique({ message: "Languages data must be distinct" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayUnique({ groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayUnique({
 *     message: "Languages data must be distinct",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayUnique<K, T extends Array<K>>(
  options?: API.Decorator.Config.Options
): API.Decorator.ForField.Basic.Instance<T> {
  return API.Decorator.ForField.Validator.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.Config.key(options, ARRAY_UNIQUE),
      valid: isArrayUniqueValid(array),
      message: API.Decorator.Config.message(options, locale, translate(locale, ARRAY_UNIQUE)),
    }),
    API.Decorator.Config.groups(options)
  );
}
