import { translate } from "../../../../../../localization";
import { Objects } from "../../../../../../utilities";
import { testRegex } from "../../../../../data/validators/string/regex/Pattern";
import { RegexConst } from "../../../../../data/validators/string/regex/shared/regex.constants";
import { createFieldValidator } from "../../../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../../../helper";
/** Internal validation function for {@link Lowercase} validator. */
function isLowercaseValid(value) {
  Objects.assertType("string", value);
  return testRegex(RegexConst.LOWERCASE, value);
}
/**
 * Checks if decorated string contains only lowercase characters.
 *
 * @key {@link DecoratorKeys.LOWERCASE}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Lowercase()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Lowercase({ message: "Input must contain only lowercase characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Lowercase({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Lowercase({
 *     message: "Input must contain only lowercase characters",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Lowercase(options) {
  return createFieldValidator(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.LOWERCASE),
      valid: isLowercaseValid(value),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.LOWERCASE)),
    }),
    buildGroupsProp(options)
  );
}
