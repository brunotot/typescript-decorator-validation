import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
/** Internal validation function for {@link Positive} validator. */
function isPositiveValid(num) {
  Objects.assertType("number", num);
  return num !== undefined && num !== null && num > 0;
}
/**
 * Checks if decorated number is a positive number (number greater than 0).
 *
 * @key {@link DecoratorKeys.POSITIVE}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Positive()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Positive({ message: "Number value must be greater than 0" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Positive({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Positive({
 *     message: "Number value must be greater than 0",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function Positive(options) {
  return createFieldValidator(
    (num, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.POSITIVE),
      valid: isPositiveValid(num),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.POSITIVE, num)),
    }),
    buildGroupsProp(options)
  );
}
