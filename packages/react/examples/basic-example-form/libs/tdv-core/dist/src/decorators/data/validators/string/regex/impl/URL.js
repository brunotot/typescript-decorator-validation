"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = void 0;
const DecoratorKeys_1 = require("../../../../../data/validators/DecoratorKeys");
const Pattern_1 = require("../../../../../data/validators/string/regex/Pattern");
const regex_constants_1 = require("../../../../../data/validators/string/regex/shared/regex.constants");
const forField_1 = require("../../../../../factory/forField");
const helper_1 = require("../../../../../helper");
const TranslationService_1 = require("../../../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../../../utilities");
/** Internal validation function for {@link URL} validator. */
function isURLValid(value) {
    _utilities_1.Objects.assertType("string", value);
    return (0, Pattern_1.testRegex)(regex_constants_1.RegexConst.URL, value);
}
/**
 * Checks if decorated string is a valid URL.
 *
 * @key {@link DecoratorKeys.URL}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@URL()
 *   url: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@URL({ message: "Input is not a valid URL" })
 *   url: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@URL({ groups: ["UPDATE"] })
 *   url: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@URL({
 *     message: "Input is not a valid URL",
 *     groups: ["UPDATE"]
 *   })
 *   url: string;
 * }
 * ```
 */
function URL(options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.URL),
        valid: isURLValid(value),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.URL)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.URL = URL;
