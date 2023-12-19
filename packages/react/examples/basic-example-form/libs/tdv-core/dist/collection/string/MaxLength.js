import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";
/** MaxLength identifier. */
export const MAX_LENGTH = "MaxLength";
/** Internal validation function for {@link MaxLength} validator. */
export function isMaxLengthValid(value, max) {
    API.Utilities.Objects.assertType("string", value);
    return (value !== null && value !== void 0 ? value : API.Utilities.Strings.EMPTY).length <= max;
}
/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link MAX_LENGTH MaxLength}
 * @typeParam T - The type of the string property.
 * @param max - Maximum length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@MaxLength(5)
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@MaxLength(5, { message: "Input must contain at-most 5 characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@MaxLength(5, { groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@MaxLength(5, { groups: ["UPDATE"], message: "Input must contain at-most 5 characters" })
 *   input: string;
 * }
 * ```
 */
export function MaxLength(max, options) {
    return API.Decorator.Service.FieldDecoratorValidatorService.build((value, _context, locale) => ({
        key: API.Decorator.key(options, MAX_LENGTH),
        valid: isMaxLengthValid(value, max),
        message: API.Decorator.message(options, locale, translate(locale, MAX_LENGTH, max)),
    }), API.Decorator.groups(options));
}
