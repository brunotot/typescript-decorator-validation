"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonNegative = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link NonNegative} validator. */
function isNonNegativeValid(num) {
    _utilities_1.Objects.assertType("number", num);
    return num !== undefined && num !== null && num >= 0;
}
/**
 * Checks if decorated number is not a negative number (can be 0).
 *
 * @key {@link DecoratorKeys.NON_NEGATIVE}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@NonNegative()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@NonNegative({ message: "Number value must not be a negative number" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@NonNegative({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@NonNegative({
 *     message: "Number value must not be a negative number",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
function NonNegative(options) {
    return (0, forField_1.createFieldValidator)((num, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.NON_NEGATIVE),
        valid: isNonNegativeValid(num),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.NON_NEGATIVE, num)),
    }), (0, helper_1.buildDecoratorMeta)(options));
}
exports.NonNegative = NonNegative;
