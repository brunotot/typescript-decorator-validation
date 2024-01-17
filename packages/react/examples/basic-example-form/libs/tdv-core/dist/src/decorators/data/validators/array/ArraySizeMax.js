"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySizeMax = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link ArraySizeMax} validator. */
function isArraySizeMaxValid(array, max) {
    _utilities_1.Objects.assertType("array", array);
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
function ArraySizeMax(max, options) {
    return (0, forField_1.createFieldValidator)((array, _, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.ARRAY_SIZE_MAX),
        valid: isArraySizeMaxValid(array, max),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.ARRAY_SIZE_MAX, max, (array !== null && array !== void 0 ? array : []).length)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.ArraySizeMax = ArraySizeMax;
