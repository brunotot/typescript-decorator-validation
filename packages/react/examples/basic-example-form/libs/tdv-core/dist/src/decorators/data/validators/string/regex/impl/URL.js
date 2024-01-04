import API from "../../../../../../../index";
import { createFieldValidator } from "../../../../../../decorators";
import { translate } from "../../../../../../localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";
/** URL identifier. */
export const URL_KEY = "URL";
/** Internal validation function for {@link URL} validator. */
export function isURLValid(value) {
    API.Utilities.Objects.assertType("string", value);
    return testRegex(RegexConst.URL, value);
}
/**
 * Checks if decorated string is a valid URL.
 *
 * @key {@link URL_KEY URL}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@URL()
 *   url: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@URL({ message: "Input is not a valid URL" })
 *   url: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@URL({ groups: ["UPDATE"] })
 *   url: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@URL({
 *     message: "Input is not a valid URL",
 *     groups: ["UPDATE"]
 *   })
 *   url: string;
 * }
 * ```
 */
export function URL(options) {
    return createFieldValidator((value, _context, locale) => ({
        key: API.Decorator.Config.key(options, URL_KEY),
        valid: testRegex(RegexConst.URL, value),
        message: API.Decorator.Config.message(options, locale, translate(locale, URL_KEY)),
    }), API.Decorator.Config.groups(options));
}
