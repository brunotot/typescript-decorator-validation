import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/** ArrayNone identifier. */
export const ARRAY_NONE = "ArrayNone";

/** Internal validation function for {@link ArrayNone} validator. */
export function isArrayNoneValid<K, T extends Array<K>>(
  array: T,
  predicate: API.Utilities.Objects.ArrayPredicate<K>
): boolean {
  API.Utilities.Objects.assertType("array", array);
  return !(array ?? []).some(predicate);
}

/**
 * Checks if no elements of decorated array satisfy the given predicate criteria.
 *
 * @key {@link ARRAY_NONE ArrayNone}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `!Array.every()` call.
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   _@ArrayNone(num => num >= 0)
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   _@ArrayNone(num => num > 0, { message: "All elements must be less than 0" })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   _@ArrayNone(num => num > 0, { groups: ["UPDATE"] })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   _@ArrayNone(num => num > 0, {
 *     message: "All elements must be less than 0",
 *     groups: ["UPDATE"]
 *   })
 *   negativeNumbers: string[];
 * }
 * ```
 **/
export function ArrayNone<K, T extends K[]>(
  predicate: API.Utilities.Objects.ArrayPredicate<K>,
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.key(options, ARRAY_NONE),
      valid: isArrayNoneValid(array, predicate),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, ARRAY_NONE)
      ),
    }),
    API.Decorator.groups(options)
  );
}
