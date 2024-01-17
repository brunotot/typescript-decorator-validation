"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueMin = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link ValueMin} validator. */
function isValueMinValid(num, min) {
    _utilities_1.Objects.assertType("number", num);
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
function ValueMin(min, options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.VALUE_MIN),
        valid: isValueMinValid(value, min),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.VALUE_MIN, min, value)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.ValueMin = ValueMin;
