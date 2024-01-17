"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueMax = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link ValueMax} validator. */
function isValueMaxValid(num, max) {
    _utilities_1.Objects.assertType("number", num);
    return num == null ? true : num <= max;
}
/**
 * Checks if decorated number is not greater than given `max` parameter.
 *
 * @key {@link DecoratorKeys.VALUE_MAX}
 * @typeParam T - The type of the number property.
 * @param max - Maximum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueMax(5)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueMax(5, { message: "Maximum allowed value is 5" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueMax(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueMax(5, {
 *     message: "Maximum allowed value is 5",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
function ValueMax(max, options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.VALUE_MAX),
        valid: isValueMaxValid(value, max),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.VALUE_MAX, max, value)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.ValueMax = ValueMax;
