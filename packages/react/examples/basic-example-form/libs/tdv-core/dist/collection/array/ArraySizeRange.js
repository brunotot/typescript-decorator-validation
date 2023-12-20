import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";
/** ArraySizeRange identifier. */
export const ARRAY_SIZE_RANGE = "ArraySizeRange";
/** Internal validation function for {@link ArraySizeRange} validator. */
export function isArraySizeRangeValid(array, min, max) {
    API.Utilities.Objects.assertType("array", array);
    return (array !== null && array !== void 0 ? array : []).length >= min && (array !== null && array !== void 0 ? array : []).length <= max;
}
/**
 * Checks if the decorated array contains at least `min` number of elements.
 *
 * @key {@link ARRAY_SIZE_RANGE ArraySizeRange}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param min - Min size value.
 * @param max - Max size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeRange(3, 5)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeRange(3, 5, { message: "You must choose at least 3 and at most 5 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeRange(3, 5, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeRange(3, 5, {
 *     message: "You must choose at least 3 and at most 5 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeRange(min, max, options) {
    return API.Decorator.ForField.Validator.build((array, _context, locale) => ({
        key: API.Decorator.Config.key(options, ARRAY_SIZE_RANGE),
        valid: isArraySizeRangeValid(array, min, max),
        message: API.Decorator.Config.message(options, locale, translate(locale, ARRAY_SIZE_RANGE, min, max, (array !== null && array !== void 0 ? array : []).length)),
    }), API.Decorator.Config.groups(options));
}
