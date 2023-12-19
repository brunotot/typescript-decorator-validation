import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";
/** AssertTrue identifier. */
export const ASSERT_TRUE = "AssertTrue";
/** Internal validation function for {@link AssertTrue} validator. */
export function isAssertTrueValid(value) {
    API.Utilities.Objects.assertType("boolean", value);
    return !!value;
}
/**
 * Checks if a boolean value is `true`.
 *
 * @key {@link ASSERT_TRUE AssertTrue}
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
export function AssertTrue(options) {
    return API.Decorator.Service.FieldDecoratorValidatorService.build((value, _context, locale) => ({
        key: API.Decorator.key(options, ASSERT_TRUE),
        valid: isAssertTrueValid(value),
        message: API.Decorator.message(options, locale, translate(locale, ASSERT_TRUE)),
    }), API.Decorator.groups(options));
}
