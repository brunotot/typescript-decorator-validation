import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
/** `@ArrayUnique` key. */
export const ARRAY_UNIQUE = "ArrayUnique";
/** Internal validation function for {@link ArrayUnique} validator. */
function isArrayUniqueValid(array) {
    Objects.assertType("array", array);
    const hashFn = Objects.hash;
    function isArrayUnique(arr, equals) {
        const set = new Set();
        for (const val of arr) {
            for (const el of set) {
                if (equals(val, el)) {
                    return false;
                }
            }
            set.add(val);
        }
        return true;
    }
    return isArrayUnique(array !== null && array !== void 0 ? array : [], (obj1, obj2) => hashFn(obj1) === hashFn(obj2));
}
/**
 * Checks if all elements in decorated array are unique.
 *
 * @key {@link ARRAY_UNIQUE ArrayUnique}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayUnique()
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayUnique({ message: "Languages data must be distinct" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayUnique({ groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayUnique({
 *     message: "Languages data must be distinct",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayUnique(options) {
    return createFieldValidator((array, _context, locale) => ({
        key: buildKeyProp(options, ARRAY_UNIQUE),
        valid: isArrayUniqueValid(array),
        message: buildMessageProp(options, locale, translate(locale, ARRAY_UNIQUE)),
    }), buildGroupsProp(options));
}
