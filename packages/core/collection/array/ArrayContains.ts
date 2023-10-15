import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/** ArrayContains identifier. */
export const ARRAY_CONTAINS = "ArrayContains";

/** Internal validation function for {@link ArrayContains} validator. */
export function isArrayContainsValid<K, T extends Array<K>>(
  value: T,
  contains: K
): boolean {
  API.Utilities.Objects.assertType("array", value);
  return (value ?? []).includes(contains);
}

/**
 * Checks if the decorated array contains a specific value.
 *
 * @key {@link ARRAY_CONTAINS ArrayContains}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param contains - The value to check.
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   _@ArrayContains("en")
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   _@ArrayContains("en", { message: "English language must be selected" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   _@ArrayContains("en", { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   _@ArrayContains("en", {
 *     message: "English language must be selected",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayContains<K, T extends Array<K>>(
  contains: K,
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.key(options, ARRAY_CONTAINS),
      valid: isArrayContainsValid(array, contains),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, ARRAY_CONTAINS, contains)
      ),
    }),
    API.Decorator.groups(options)
  );
}
