import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
/** Internal validation function for {@link ArrayNone} validator. */
function isArrayNoneValid(array, predicate) {
  Objects.assertType("array", array);
  return !(array !== null && array !== void 0 ? array : []).some(predicate);
}
/**
 * Checks if no elements of decorated array satisfy the given predicate criteria.
 *
 * @key {@link DecoratorKeys.ARRAY_NONE}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `!Array.every()` call.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayNone(num => num >= 0)
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayNone(num => num > 0, { message: "All elements must be less than 0" })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayNone(num => num > 0, { groups: ["UPDATE"] })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayNone(num => num > 0, {
 *     message: "All elements must be less than 0",
 *     groups: ["UPDATE"]
 *   })
 *   negativeNumbers: string[];
 * }
 * ```
 **/
export function ArrayNone(predicate, options) {
  return createFieldValidator(
    (array, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.ARRAY_NONE),
      valid: isArrayNoneValid(array, predicate),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.ARRAY_NONE)),
    }),
    buildGroupsProp(options)
  );
}
