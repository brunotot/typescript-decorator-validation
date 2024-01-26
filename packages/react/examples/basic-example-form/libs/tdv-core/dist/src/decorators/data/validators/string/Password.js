"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const regex_constants_1 = require("../../../data/validators/string/regex/shared/regex.constants");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
/** Internal validation function for {@link Password} validator. */
function isPasswordValid(input, rules, definedMessage, locale) {
    var _a, _b, _c, _d, _e;
    const PASSWORD_REGEXES = {
        uppercase: regex_constants_1.RegexConst.UPPERCASE_ANYWHERE,
        lowercase: regex_constants_1.RegexConst.LOWERCASE_ANYWHERE,
        numbers: regex_constants_1.RegexConst.NUMERIC_ANYWHERE,
        specials: regex_constants_1.RegexConst.SPECIALS_ANYWHERE,
    };
    function isInvalid(text, rule) {
        const matchers = text.match(PASSWORD_REGEXES[rule]);
        return matchers === null || matchers.length === 0;
    }
    function buildConstraintViolation(message, valid) {
        return {
            key: DecoratorKeys_1.DecoratorKeys.PASSWORD,
            message,
            valid,
        };
    }
    const lowercase = (_a = rules === null || rules === void 0 ? void 0 : rules.lowercase) !== null && _a !== void 0 ? _a : true;
    const uppercase = (_b = rules === null || rules === void 0 ? void 0 : rules.uppercase) !== null && _b !== void 0 ? _b : false;
    const numbers = (_c = rules === null || rules === void 0 ? void 0 : rules.numbers) !== null && _c !== void 0 ? _c : false;
    const specials = (_d = rules === null || rules === void 0 ? void 0 : rules.specials) !== null && _d !== void 0 ? _d : false;
    const length = (_e = rules === null || rules === void 0 ? void 0 : rules.length) !== null && _e !== void 0 ? _e : 8;
    const str = input !== null && input !== void 0 ? input : "";
    if (str.length < length) {
        return buildConstraintViolation(definedMessage !== null && definedMessage !== void 0 ? definedMessage : (0, TranslationService_1.translate)(locale, "PasswordLength", length), false);
    }
    if (uppercase && isInvalid(str, "uppercase")) {
        return buildConstraintViolation(definedMessage !== null && definedMessage !== void 0 ? definedMessage : (0, TranslationService_1.translate)(locale, "PasswordUppercase"), false);
    }
    if (lowercase && isInvalid(str, "lowercase")) {
        return buildConstraintViolation(definedMessage !== null && definedMessage !== void 0 ? definedMessage : (0, TranslationService_1.translate)(locale, "PasswordLowercase"), false);
    }
    if (numbers && isInvalid(str, "numbers")) {
        return buildConstraintViolation(definedMessage !== null && definedMessage !== void 0 ? definedMessage : (0, TranslationService_1.translate)(locale, "PasswordNumbers"), false);
    }
    if (specials && isInvalid(str, "specials")) {
        return buildConstraintViolation(definedMessage !== null && definedMessage !== void 0 ? definedMessage : (0, TranslationService_1.translate)(locale, "PasswordSpecials"), false);
    }
    return { key: DecoratorKeys_1.DecoratorKeys.PASSWORD, message: "", valid: true };
}
/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link DecoratorKeys.PASSWORD}
 * @typeParam T - The type of the string property.
 * @param rules - Customizable rules for specific password validations.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Password()
 *   password: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Password(undefined, { message: "Password does not meet the necessary requirements" })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Password(undefined, { groups: ["UPDATE"] })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Password(undefined, { groups: ["UPDATE"], message: "Password does not meet the necessary requirements" })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 5: Supplying custom validation logic while having the error message automatically translated
 * ```ts
 * class Form {
 *   \@Password({ uppercase: true, lowercase: true, })
 *   password: string;
 * }
 * ```
 */
function Password(rules, options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => isPasswordValid(value, rules, (0, helper_1.buildMessageProp)(options, locale), locale), (0, helper_1.buildDecoratorMeta)(options));
}
exports.Password = Password;
