import API from "../../../../../../../index";
import { createFieldValidator } from "../../../../../../decorators";
import { translate } from "../../../../../../localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";
/** Alpha identifier. */
export const ALPHA = "Alpha";
/** Internal validation function for {@link Alpha} validator. */
export function isAlphaValid(value) {
  API.Utilities.Objects.assertType("string", value);
  return testRegex(RegexConst.ALPHA, value);
}
/**
 * Checks if decorated string contains only alphabetical characters.
 *
 * @key {@link ALPHA Alpha}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Alpha()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Alpha({ message: "Input must contain only alphabetical characters (no numbers or specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Alpha({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Alpha({
 *     message: "Input must contain only alphabetical characters (no numbers or specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Alpha(options) {
  return createFieldValidator(
    (value, _context, locale) => ({
      key: API.Decorators.key(options, ALPHA),
      valid: testRegex(RegexConst.ALPHA, value),
      message: API.Decorators.message(options, locale, translate(locale, ALPHA)),
    }),
    API.Decorators.groups(options)
  );
}