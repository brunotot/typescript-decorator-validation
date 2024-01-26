"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pattern = exports.testRegex = void 0;
const forField_1 = require("../../../../factory/forField");
const helper_1 = require("../../../../helper");
const TranslationService_1 = require("../../../../../localization/service/TranslationService");
/**
 * Tests if a value matches a regular expression pattern.
 * @template T - The type of the value being tested.
 * @param regex - The regular expression pattern to test against.
 * @param value - The value to test.
 * @returns A boolean indicating whether the value matches the pattern.
 */
function testRegex(regex, value) {
    return (value !== null && value !== void 0 ? value : "").length === 0 || regex.test(value);
}
exports.testRegex = testRegex;
/**
 * Creates a validator decorator that checks if a string value matches a regular expression pattern.
 * @typeparam T - The type of the decorated property (optional string).
 * @param regex The regular expression pattern to match against the value.
 * @param message - (Optional) The custom error message to display when validation fails.
 * @param key - (Optional) The key to identify this validation rule in error messages. Defaults to "Pattern".
 * @param config - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 * @example
 * 1: Basic usage with default options
 * ```ts
 * class MyClass {
 *   \@Pattern(/^[A-Za-z]+$/)
 *   lettersOnly: string;
 * }
 * ```
 * @example
 * 2: Custom error message and validation groups
 * ```ts
 * class MyClass {
 *   \@Pattern(/^[A-Za-z]+$/, {
 *     key: "AlphabeticPattern",
 *     message: "Must contain only alphabetic characters",
 *     groups: ["group1", "group2"],
 *   })
 *   lettersOnly: string;
 * }
 * ```
 */
function Pattern(regex, options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, "Pattern"),
        valid: testRegex(regex, value),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, "Pattern", regex.toString())),
    }), (0, helper_1.buildDecoratorMeta)(options));
}
exports.Pattern = Pattern;
