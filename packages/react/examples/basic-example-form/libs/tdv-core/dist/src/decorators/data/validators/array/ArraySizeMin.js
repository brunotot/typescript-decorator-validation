"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySizeMin = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link ArraySizeMin} validator. */
function isArraySizeMinValid(array, min) {
    _utilities_1.Objects.assertType("array", array);
    return (array !== null && array !== void 0 ? array : []).length >= min;
}
/**
 * Checks if the decorated array contains at least `min` number of elements.
 *
 * @key {@link DecoratorKeys.ARRAY_SIZE_MIN}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param min - Min size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { message: "You must choose at least 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, {
 *     message: "You must choose at least 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
function ArraySizeMin(min, options) {
    return (0, forField_1.createFieldValidator)((array, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.ARRAY_SIZE_MIN),
        valid: isArraySizeMinValid(array, min),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.ARRAY_SIZE_MIN, min, (array !== null && array !== void 0 ? array : []).length)),
    }), (0, helper_1.buildDecoratorMeta)(options));
}
exports.ArraySizeMin = ArraySizeMin;
