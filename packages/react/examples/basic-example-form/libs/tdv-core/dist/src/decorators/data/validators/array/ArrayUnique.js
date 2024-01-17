"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUnique = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link ArrayUnique} validator. */
function isArrayUniqueValid(array) {
    _utilities_1.Objects.assertType("array", array);
    const hashFn = _utilities_1.Objects.hash;
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
 * @key {@link DecoratorKeys.ARRAY_UNIQUE}
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
function ArrayUnique(options) {
    return (0, forField_1.createFieldValidator)((array, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.ARRAY_UNIQUE),
        valid: isArrayUniqueValid(array),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.ARRAY_UNIQUE)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.ArrayUnique = ArrayUnique;
