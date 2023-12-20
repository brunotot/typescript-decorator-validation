import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";
/** ValueMin identifier. */
export const VALUE_MIN = "ValueMin";
/** Internal validation function for {@link ValueMin} validator. */
function isValueMinValid(num, min) {
    API.Utilities.Objects.assertType("number", num);
    return num == null ? true : num >= min;
}
/**
 * Checks if decorated number is not lesser than given `min` parameter.
 *
 * @key {@link VALUE_MIN ValueMin}
 * @typeParam T - The type of the number property.
 * @param min - Minimum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueMin(5)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueMin(5, { message: "Minimum allowed value is 5" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueMin(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueMin(5, {
 *     message: "Minimum allowed value is 5",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function ValueMin(min, options) {
    return API.Decorator.ForField.Validator.build((value, _context, locale) => ({
        key: API.Decorator.Config.key(options, VALUE_MIN),
        valid: isValueMinValid(value, min),
        message: API.Decorator.Config.message(options, locale, translate(locale, VALUE_MIN, min, value)),
    }), API.Decorator.Config.groups(options));
}
