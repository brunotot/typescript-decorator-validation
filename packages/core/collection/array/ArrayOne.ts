import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";

/** ArrayOne identifier. */
export const ARRAY_ONE = "ArrayOne";

/** Internal validation function for {@link ArrayOne} validator. */
export function isArrayOneValid<K, T extends Array<K>>(
  array: T,
  predicate: API.Utilities.Objects.ArrayPredicate<K>
): boolean {
  API.Utilities.Objects.assertType("array", array);
  return (array ?? []).filter(predicate).length === 1;
}

/**
 * Checks if exactly one element of decorated array satisfies the given predicate criteria.
 *
 * @key {@link ARRAY_ONE ArrayOne}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `Array.filter()` call.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num >= 0)
 *   onlyOnePositive: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num > 0, { message: "Exactly one positive number is allowed" })
 *   onlyOnePositive: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num > 0, { groups: ["UPDATE"] })
 *   onlyOnePositive: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num > 0, {
 *     message: "Exactly one positive number is allowed",
 *     groups: ["UPDATE"]
 *   })
 *   onlyOnePositive: string[];
 * }
 * ```
 **/
export function ArrayOne<K, T extends Array<K>>(
  predicate: API.Utilities.Objects.ArrayPredicate<K>,
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.key(options, ARRAY_ONE),
      valid: isArrayOneValid(array, predicate),
      message: API.Decorator.message(options, locale, translate(locale, ARRAY_ONE)),
    }),
    API.Decorator.groups(options)
  );
}
