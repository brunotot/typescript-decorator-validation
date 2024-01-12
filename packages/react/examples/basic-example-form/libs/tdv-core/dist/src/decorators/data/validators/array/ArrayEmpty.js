import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
/** `@ArrayEmpty` key. */
export const ARRAY_EMPTY = "ArrayEmpty";
/** Internal validation function for {@link ArrayEmpty} validator. */
function isArrayEmptyValid(array) {
    Objects.assertType("array", array);
    return (array !== null && array !== void 0 ? array : []).length === 0;
}
/**
 * Checks if the decorated array is empty.
 *
 * @key {@link ARRAY_EMPTY ArrayEmpty}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayEmpty()
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayEmpty({ message: "Languages data must be empty" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayEmpty({ groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayEmpty({
 *     message: "Languages data must be empty",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayEmpty(options) {
    return createFieldValidator((array, _context, locale) => ({
        key: buildKeyProp(options, ARRAY_EMPTY),
        valid: isArrayEmptyValid(array),
        message: buildMessageProp(options, locale, translate(locale, ARRAY_EMPTY)),
    }), buildGroupsProp(options));
}
