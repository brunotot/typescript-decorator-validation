import { translate } from "../../../../../../localization";
import { Objects } from "../../../../../../utilities";
import { testRegex } from "../../../../../data/validators/string/regex/Pattern";
import { RegexConst } from "../../../../../data/validators/string/regex/shared/regex.constants";
import { createFieldValidator } from "../../../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../../../helper";
/** Internal validation function for {@link Alphanumeric} validator. */
function isAlphanumericValid(value) {
  Objects.assertType("string", value);
  return testRegex(RegexConst.ALPHANUMERIC, value);
}
/**
 * Checks if decorated string contains only alphabetical or number characters.
 *
 * @key {@link DecoratorKeys.ALPHANUMERIC}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Alphanumeric()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Alphanumeric({ message: "Input must contain only alphabetical or number characters (no specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Alphanumeric({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Alphanumeric({
 *     message: "Input must contain only alphabetical or number characters (no specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Alphanumeric(options) {
  return createFieldValidator(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.ALPHANUMERIC),
      valid: isAlphanumericValid(value),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.ALPHANUMERIC)),
    }),
    buildGroupsProp(options)
  );
}
