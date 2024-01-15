import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
/** Internal validation function for {@link Integer} validator. */
function isIntegerValid(num) {
  Objects.assertType("number", num);
  return num !== undefined && num !== null && Number.isInteger(num);
}
/**
 * Checks if decorated number is an integer number.
 *
 * @key {@link DecoratorKeys.INTEGER}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Integer()
 *   age: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Integer({ message: "Age number input must be an integer" })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Integer({ groups: ["UPDATE"] })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Integer({
 *     message: "Age number input must be an integer",
 *     groups: ["UPDATE"]
 *   })
 *   age: number;
 * }
 * ```
 */
export function Integer(options) {
  return createFieldValidator(
    (num, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.INTEGER),
      valid: isIntegerValid(num),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.INTEGER, num)),
    }),
    buildGroupsProp(options)
  );
}
