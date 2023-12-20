import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";
/** ValueRange identifier. */
export const VALUE_RANGE = "ValueRange";
/** Internal validation function for {@link ValueRange} validator. */
function isValueRangeValid(num, min, max) {
    API.Utilities.Objects.assertType("number", num);
    return num == null ? true : num >= min && num <= max;
}
/**
 * Checks if decorated number is within a given range of `min` and `max` parameters.
 *
 * @key {@link VALUE_RANGE ValueRange}
 * @typeParam T - The type of the number property.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueRange(5, 10)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueRange(5, 10, { message: "Number must be greater than 4 and less than 11" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueRange(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueRange(5, 10, {
 *     message: "Number must be greater than 4 and less than 11",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function ValueRange(min, max, options) {
    return API.Decorator.ForField.Validator.build((num, _context, locale) => ({
        key: API.Decorator.Config.key(options, VALUE_RANGE),
        valid: isValueRangeValid(num, min, max),
        message: API.Decorator.Config.message(options, locale, translate(locale, VALUE_RANGE, min, max, num)),
    }), API.Decorator.Config.groups(options));
}
