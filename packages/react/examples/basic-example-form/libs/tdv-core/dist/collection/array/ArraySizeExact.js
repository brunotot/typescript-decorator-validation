import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";
/** ArraySizeExact identifier. */
export const ARRAY_SIZE_EXACT = "ArraySizeExact";
/** Internal validation function for {@link ArraySizeExact} validator. */
export function isArraySizeExactValid(array) {
    API.Utilities.Objects.assertType("array", array);
    return (array !== null && array !== void 0 ? array : []).length === 0;
}
/**
 * Checks if the decorated array contains an exact number of elements.
 *
 * @key {@link ARRAY_SIZE_EXACT ArraySizeExact}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param exact - Exact size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3, { message: "You must choose exactly 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3, {
 *     message: "You must choose exactly 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeExact(exact, options) {
    return API.Decorator.ForField.Validator.build((array, _context, locale) => ({
        key: API.Decorator.Config.key(options, ARRAY_SIZE_EXACT),
        valid: (array !== null && array !== void 0 ? array : []).length === exact,
        message: API.Decorator.Config.message(options, locale, translate(locale, ARRAY_SIZE_EXACT, exact, (array !== null && array !== void 0 ? array : []).length)),
    }), API.Decorator.Config.groups(options));
}
