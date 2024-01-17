"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertTrue = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link AssertTrue} validator. */
function isAssertTrueValid(value) {
    _utilities_1.Objects.assertType("boolean", value);
    return !!value;
}
/**
 * Checks if a boolean value is `true`.
 *
 * @key {@link DecoratorKeys.ASSERT_TRUE}
 * @typeParam T - The type of the decorated property (boolean).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `boolean`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Register {
 *   \@AssertTrue()
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Register {
 *   \@AssertTrue({ message: "You must accept our terms of services to continue" })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Register {
 *   \@AssertTrue({ groups: ["UPDATE"] })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Register {
 *   \@AssertTrue({
 *     message: "You must accept our terms of services to continue",
 *     groups: ["UPDATE"]
 *   })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 */
function AssertTrue(options) {
    return (0, forField_1.createFieldValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.ASSERT_TRUE),
        valid: isAssertTrueValid(value),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.ASSERT_TRUE)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.AssertTrue = AssertTrue;
