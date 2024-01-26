"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lowercase = void 0;
const DecoratorKeys_1 = require("../../../../../data/validators/DecoratorKeys");
const Pattern_1 = require("../../../../../data/validators/string/regex/Pattern");
const regex_constants_1 = require("../../../../../data/validators/string/regex/shared/regex.constants");
const forField_1 = require("../../../../../factory/forField");
const helper_1 = require("../../../../../helper");
const TranslationService_1 = require("../../../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../../../utilities");
/** Internal validation function for {@link Lowercase} validator. */
function isLowercaseValid(value) {
    _utilities_1.Objects.assertType("string", value);
    return (0, Pattern_1.testRegex)(regex_constants_1.RegexConst.LOWERCASE, value);
}
/**
 * Checks if decorated string contains only lowercase characters.
 *
 * @key {@link DecoratorKeys.LOWERCASE}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Lowercase()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Lowercase({ message: "Input must contain only lowercase characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Lowercase({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Lowercase({
 *     message: "Input must contain only lowercase characters",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
function Lowercase(options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.LOWERCASE),
        valid: isLowercaseValid(value),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.LOWERCASE)),
    }), (0, helper_1.buildDecoratorMeta)(options));
}
exports.Lowercase = Lowercase;
