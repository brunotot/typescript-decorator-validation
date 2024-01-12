import { testRegex } from "../../../../../data/validators/string/regex/Pattern";
import { RegexConst } from "../../../../../data/validators/string/regex/shared/regex.constants";
import { createFieldValidator } from "../../../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../../../helper";
import { translate } from "../../../../../../localization";
import { Objects } from "../../../../../../utilities";
/** `@Numeric` key. */
export const NUMERIC = "Numeric";
/** Internal validation function for {@link Numeric} validator. */
function isNumericValid(value) {
    Objects.assertType("string", value);
    return testRegex(RegexConst.NUMERIC, value);
}
/**
 * Checks if decorated string contains only numeric characters.
 *
 * @key {@link NUMERIC Numeric}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Numeric()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Numeric({ message: "Input must contain only numeric characters (no alphabeticals or specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Numeric({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Numeric({
 *     message: "Input must contain only numeric characters (no alphabeticals or specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Numeric(options) {
    return createFieldValidator((value, _context, locale) => ({
        key: buildKeyProp(options, NUMERIC),
        valid: testRegex(RegexConst.NUMERIC, value),
        message: buildMessageProp(options, locale, translate(locale, NUMERIC)),
    }), buildGroupsProp(options));
}
