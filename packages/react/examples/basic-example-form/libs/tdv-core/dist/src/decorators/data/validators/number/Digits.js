"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Digits = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
/** Internal validation function for {@link Digits} validator. */
function isDigitsValid(number, ints, decs) {
    const assertValidInputs = () => {
        const isMaxIntegersValid = ints !== Infinity && ints % 1 === 0 && ints >= 0;
        const isMaxDecimalsValid = decs !== Infinity && decs % 1 === 0 && decs >= 0;
        const isInputInvalid = !isMaxIntegersValid || !isMaxDecimalsValid;
        if (isInputInvalid)
            throw new Error((0, TranslationService_1.translate)(null, "InvalidDigits", ints, decs));
    };
    assertValidInputs();
    if (number == null)
        return true;
    const parts = number.toString().split(".");
    const integerPart = parts[0];
    const fractionPart = parts[1] || "";
    return integerPart.length <= ints && fractionPart.length <= decs;
}
/**
 * Checks if decorated number is a decimal number.
 *
 * @key {@link DecoratorKeys.DIGITS}
 * @typeParam T - The type of the number property.
 * @param intsLimit - The maximum number of allowed integer digits.
 * @param decimalsLimit - The maximum number of allowed decimal digits.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Product {
 *   \@Digits(9, 2)
 *   price: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Product {
 *   \@Digits(9, 2, { message: "Price may have up to 9 integer digits and a precision of up to 2 decimals" })
 *   price: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Product {
 *   \@Digits(9, 2, { groups: ["UPDATE"] })
 *   price: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Product {
 *   \@Digits(9, 2, {
 *     message: "Price may have up to 9 integer digits and a precision of up to 2 decimals",
 *     groups: ["UPDATE"]
 *   })
 *   price: number;
 * }
 * ```
 */
function Digits(intsLimit, decimalsLimit, options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.DIGITS),
        valid: isDigitsValid(value, intsLimit, decimalsLimit),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.DIGITS, intsLimit, decimalsLimit)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.Digits = Digits;
