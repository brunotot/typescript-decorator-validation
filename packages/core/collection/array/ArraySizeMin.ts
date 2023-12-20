import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";

/** ArraySizeMin identifier. */
export const ARRAY_SIZE_MIN = "ArraySizeMin";

/** Internal validation function for {@link ArraySizeMin} validator. */
export function isArraySizeMinValid(array: any[], min: number): boolean {
  API.Utilities.Objects.assertType("array", array);
  return (array ?? []).length >= min;
}

/**
 * Checks if the decorated array contains at least `min` number of elements.
 *
 * @key {@link ARRAY_SIZE_MIN ArraySizeMin}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param min - Min size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { message: "You must choose at least 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, {
 *     message: "You must choose at least 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeMin<K, T extends Array<K>>(
  min: number,
  options?: API.Decorator.Config.Options
): API.Decorator.ForField.Basic.Instance<T> {
  return API.Decorator.ForField.Validator.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.Config.key(options, ARRAY_SIZE_MIN),
      valid: isArraySizeMinValid(array, min),
      message: API.Decorator.Config.message(
        options,
        locale,
        translate(locale, ARRAY_SIZE_MIN, min, (array ?? []).length)
      ),
    }),
    API.Decorator.Config.groups(options)
  );
}
