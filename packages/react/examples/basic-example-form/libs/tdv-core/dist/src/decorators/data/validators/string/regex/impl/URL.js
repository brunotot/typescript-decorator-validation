import { translate } from "../../../../../../localization";
import { Objects } from "../../../../../../utilities";
import { testRegex } from "../../../../../data/validators/string/regex/Pattern";
import { RegexConst } from "../../../../../data/validators/string/regex/shared/regex.constants";
import { createFieldValidator } from "../../../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../../../helper";
/** Internal validation function for {@link URL} validator. */
function isURLValid(value) {
  Objects.assertType("string", value);
  return testRegex(RegexConst.URL, value);
}
/**
 * Checks if decorated string is a valid URL.
 *
 * @key {@link DecoratorKeys.URL_KEY}
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
  return createFieldValidator(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.URL_KEY),
      valid: isURLValid(value),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.URL_KEY)),
    }),
    buildGroupsProp(options)
  );
}
