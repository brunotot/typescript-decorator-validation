"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decimal = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link Decimal} validator. */
function isDecimalValid(value) {
    _utilities_1.Objects.assertType("number", value);
    return value !== undefined && value !== null && !Number.isInteger(value);
}
/**
 * Checks if decorated number is a decimal number.
 *
 * @key {@link DecoratorKeys.DECIMAL}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Decimal()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Decimal({ message: "Number must be a decimal" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Decimal({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Decimal({
 *     message: "Number must be a decimal",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
function Decimal(options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.DECIMAL),
        valid: isDecimalValid(value),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.DECIMAL, value)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.Decimal = Decimal;
