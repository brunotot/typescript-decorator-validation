import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
/** Internal validation function for {@link ArrayContains} validator. */
function isArrayContainsValid(value, contains) {
  Objects.assertType("array", value);
  return (value !== null && value !== void 0 ? value : []).includes(contains);
}
/**
 * Checks if the decorated array contains a specific value.
 *
 * @key {@link DecoratorKeys.ARRAY_CONTAINS}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param contains - The value to check.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayContains("en")
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayContains("en", { message: "English language must be selected" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayContains("en", { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayContains("en", {
 *     message: "English language must be selected",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayContains(contains, options) {
  return createFieldValidator(
    (array, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.ARRAY_CONTAINS),
      valid: isArrayContainsValid(array, contains),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.ARRAY_CONTAINS, contains)),
    }),
    buildGroupsProp(options)
  );
}
