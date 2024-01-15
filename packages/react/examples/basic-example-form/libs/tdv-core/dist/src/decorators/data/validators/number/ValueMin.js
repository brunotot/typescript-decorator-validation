import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
/** Internal validation function for {@link ValueMin} validator. */
function isValueMinValid(num, min) {
  Objects.assertType("number", num);
  return num == null ? true : num >= min;
}
/**
 * Checks if decorated number is not lesser than given `min` parameter.
 *
 * @key {@link DecoratorKeys.VALUE_MIN}
 * @typeParam T - The type of the number property.
 * @param min - Minimum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueMin(5)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueMin(5, { message: "Minimum allowed value is 5" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueMin(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueMin(5, {
 *     message: "Minimum allowed value is 5",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function ValueMin(min, options) {
  return createFieldValidator(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.VALUE_MIN),
      valid: isValueMinValid(value, min),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.VALUE_MIN, min, value)),
    }),
    buildGroupsProp(options)
  );
}
