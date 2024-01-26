"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integer = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link Integer} validator. */
function isIntegerValid(num) {
    _utilities_1.Objects.assertType("number", num);
    return num !== undefined && num !== null && Number.isInteger(num);
}
/**
 * Checks if decorated number is an integer number.
 *
 * @key {@link DecoratorKeys.INTEGER}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Integer()
 *   age: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Integer({ message: "Age number input must be an integer" })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Integer({ groups: ["UPDATE"] })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Integer({
 *     message: "Age number input must be an integer",
 *     groups: ["UPDATE"]
 *   })
 *   age: number;
 * }
 * ```
 */
function Integer(options) {
    return (0, forField_1.createFieldValidator)((num, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.INTEGER),
        valid: isIntegerValid(num),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.INTEGER, num)),
    }), (0, helper_1.buildDecoratorMeta)(options));
}
exports.Integer = Integer;
