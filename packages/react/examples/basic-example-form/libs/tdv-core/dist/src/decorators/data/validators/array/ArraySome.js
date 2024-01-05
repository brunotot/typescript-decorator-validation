import API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createFieldValidator } from "../../../index";
/** ArraySome identifier. */
export const ARRAY_SOME = "ArraySome";
/** Internal validation function for {@link ArraySome} validator. */
export function isArraySomeValid(array, predicate) {
  API.Utilities.Objects.assertType("array", array);
  return (array !== null && array !== void 0 ? array : []).some(predicate);
}
/**
 * Checks if at least one element of decorated array satisfies the given predicate criteria.
 *
 * @key {@link ARRAY_SOME ArraySome}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `Array.some()` call.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySome(num => num >= 0)
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySome(num => num > 0, { message: "At least one element must be greater than 0" })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySome(num => num > 0, { groups: ["UPDATE"] })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySome(num => num > 0, {
 *     message: "At least one element must be greater than 0",
 *     groups: ["UPDATE"]
 *   })
 *   negativeNumbers: string[];
 * }
 * ```
 **/
export function ArraySome(predicate, options) {
  return createFieldValidator(
    (array, _context, locale) => ({
      key: API.Decorators.key(options, ARRAY_SOME),
      valid: isArraySomeValid(array, predicate),
      message: API.Decorators.message(options, locale, translate(locale, ARRAY_SOME)),
    }),
    API.Decorators.groups(options)
  );
}