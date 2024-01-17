"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExactLength = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link ExactLength} validator. */
function isExactLengthValid(value, exact) {
    _utilities_1.Objects.assertType("string", value);
    return (value !== null && value !== void 0 ? value : "").length === exact;
}
/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link DecoratorKeys.EXACT_LENGTH}
 * @typeParam T - The type of the string property.
 * @param exact - Exact length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Address {
 *   \@ExactLength(2)
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Address {
 *   \@ExactLength(2, { message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Address {
 *   \@ExactLength(2, { groups: ["UPDATE"] })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Address {
 *   \@ExactLength(2, { groups: ["UPDATE"], message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 */
function ExactLength(exact, options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.EXACT_LENGTH),
        valid: isExactLengthValid(value, exact),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.EXACT_LENGTH, exact)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.ExactLength = ExactLength;
