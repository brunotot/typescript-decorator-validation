"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySome = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link ArraySome} validator. */
function isArraySomeValid(array, predicate) {
    _utilities_1.Objects.assertType("array", array);
    return (array !== null && array !== void 0 ? array : []).some(predicate);
}
/**
 * Checks if at least one element of decorated array satisfies the given predicate criteria.
 *
 * @key {@link DecoratorKeys.ARRAY_SOME}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `Array.some()` call.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySome(num => num >= 0)
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySome(num => num > 0, { message: "At least one element must be greater than 0" })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySome(num => num > 0, { groups: ["UPDATE"] })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySome(num => num > 0, {
 *     message: "At least one element must be greater than 0",
 *     groups: ["UPDATE"]
 *   })
 *   negativeNumbers: string[];
 * }
 * ```
 **/
function ArraySome(predicate, options) {
    return (0, forField_1.createFieldValidator)((array, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.ARRAY_SOME),
        valid: isArraySomeValid(array, predicate),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.ARRAY_SOME)),
    }), (0, helper_1.buildDecoratorMeta)(options));
}
exports.ArraySome = ArraySome;
