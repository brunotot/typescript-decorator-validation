import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
/** Internal validation function for {@link ArraySizeMax} validator. */
function isArraySizeMaxValid(array, max) {
  Objects.assertType("array", array);
  return (array !== null && array !== void 0 ? array : []).length <= max;
}
/**
 * Checks if the decorated array contains up to `max` number of elements.
 *
 * @key {@link DecoratorKeys.ARRAY_SIZE_MAX}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param max - Max size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeMax(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeMax(3, { message: "You must choose no more than 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeMax(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeMax(3, {
 *     message: "You must choose no more than 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeMax(max, options) {
  return createFieldValidator(
    (array, _, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.ARRAY_SIZE_MAX),
      valid: isArraySizeMaxValid(array, max),
      message: buildMessageProp(
        options,
        locale,
        translate(locale, DecoratorKeys.ARRAY_SIZE_MAX, max, (array !== null && array !== void 0 ? array : []).length)
      ),
    }),
    buildGroupsProp(options)
  );
}
