import API from "../../../../index";
import { translate } from "../../../../src/localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";
/** Uppercase identifier. */
export const UPPERCASE = "Uppercase";
/** Internal validation function for {@link Uppercase} validator. */
export function isUppercaseValid(value) {
    API.Utilities.Objects.assertType("string", value);
    return testRegex(RegexConst.UPPERCASE, value);
}
/**
 * Checks if decorated string contains only uppercase characters.
 *
 * @key {@link UPPERCASE Uppercase}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Uppercase()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Uppercase({ message: "Input must contain only uppercase characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Uppercase({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Uppercase({
 *     message: "Input must contain only uppercase characters",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Uppercase(options) {
    return API.Decorator.ForField.Validator.build((value, _context, locale) => ({
        key: API.Decorator.Config.key(options, UPPERCASE),
        valid: testRegex(RegexConst.UPPERCASE, value),
        message: API.Decorator.Config.message(options, locale, translate(locale, UPPERCASE)),
    }), API.Decorator.Config.groups(options));
}
