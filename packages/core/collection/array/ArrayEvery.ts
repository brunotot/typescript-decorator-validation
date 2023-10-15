import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/** ArrayEvery identifier. */
export const ARRAY_EVERY = "ArrayEvery";

/** Internal validation function for {@link ArrayEvery} validator. */
export function isArrayEveryValid<K, T extends Array<K>>(
  array: T,
  predicate: API.Utilities.Objects.ArrayPredicate<K>
): boolean {
  API.Utilities.Objects.assertType("array", array);
  return (array ?? []).every(predicate);
}

/**
 * Checks if all elements of decorated array satisfy the given predicate criteria.
 *
 * @key {@link ARRAY_EVERY ArrayEvery}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `Array.every()` call.
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   _@ArrayEvery(num => num > 0)
 *   positiveNumbers: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   _@ArrayEvery(num => num > 0, { message: "All elements must be greater than 0" })
 *   positiveNumbers: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   _@ArrayEvery(num => num > 0, { groups: ["UPDATE"] })
 *   positiveNumbers: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   _@ArrayEvery(num => num > 0, {
 *     message: "All elements must be greater than 0",
 *     groups: ["UPDATE"]
 *   })
 *   positiveNumbers: string[];
 * }
 * ```
 **/
export function ArrayEvery<K, T extends Array<K>>(
  predicate: API.Utilities.Objects.ArrayPredicate<K>,
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.key(options, ARRAY_EVERY),
      valid: isArrayEveryValid(array, predicate),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, ARRAY_EVERY)
      ),
    }),
    API.Decorator.groups(options)
  );
}
