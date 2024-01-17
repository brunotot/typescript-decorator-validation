"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertFalse = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link AssertFalse} validator. */
function isAssertFalseValid(value) {
    _utilities_1.Objects.assertType("boolean", value);
    return !value;
}
/**
 * Checks if a boolean value is `false`.
 *
 * @key {@link DecoratorKeys.ASSERT_FALSE}
 * @typeParam T - The type of the decorated property (boolean).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `boolean`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class State {
 *   \@AssertFalse()
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class State {
 *   \@AssertFalse({ message: "You must resolve all errors before continuing" })
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class State {
 *   \@AssertFalse({ groups: ["UPDATE"] })
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class State {
 *   \@AssertFalse({
 *     message: "You must resolve all errors before continuing",
 *     groups: ["UPDATE"]
 *   })
 *   hasErrors: boolean;
 * }
 * ```
 */
function AssertFalse(options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.ASSERT_FALSE),
        valid: isAssertFalseValid(value),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.ASSERT_FALSE)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.AssertFalse = AssertFalse;
