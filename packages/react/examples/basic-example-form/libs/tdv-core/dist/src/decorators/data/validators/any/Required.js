"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Required = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
/**
 * Checks if a value is not `null`, `undefined`, `false`, an empty array, an empty string, or an invalid Date.
 * @typeParam T - The type of the value.
 */
function isRequiredValid(value) {
    return !(value === undefined ||
        value === null ||
        value === false ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "string" && value.trim().length === 0) ||
        (value instanceof Date && value.toString() === "Invalid Date"));
}
/**
 * Creates a validator decorator which requires that a value must be present.
 *
 * @key {@link DecoratorKeys.REQUIRED}
 * @typeParam T - The type of the decorated property (any class field).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use with class fields.
 *
 * @example
 * Example 1: Basic usage
 * ```ts
 * class Product {
 *   \@Required()
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 2: Supplying a custom error message
 * ```ts
 * class Product {
 *   \@Required({ message: "Product name is mandatory" })
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 3: Supplying a custom error message and groups
 * ```ts
 * class Product {
 *   \@Required({
 *     message: "Product name is mandatory",
 *     groups: ["CREATE"]
 *   })
 *   name: string;
 * }
 * ```
 */
function Required(options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.REQUIRED),
        valid: isRequiredValid(value),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.REQUIRED)),
    }), (0, helper_1.buildDecoratorMeta)(options));
}
exports.Required = Required;
