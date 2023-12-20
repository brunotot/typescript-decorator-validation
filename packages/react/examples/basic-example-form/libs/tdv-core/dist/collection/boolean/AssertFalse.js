import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";
/** AssertFalse identifier. */
export const ASSERT_FALSE = "AssertFalse";
/** Internal validation function for {@link AssertFalse} validator. */
export function isAssertFalseValid(value) {
    API.Utilities.Objects.assertType("boolean", value);
    return !value;
}
/**
 * Checks if a boolean value is `false`.
 *
 * @key {@link ASSERT_FALSE AssertFalse}
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
export function AssertFalse(options) {
    return API.Decorator.ForField.Validator.build((value, _context, locale) => ({
        key: API.Decorator.Config.key(options, ASSERT_FALSE),
        valid: isAssertFalseValid(value),
        message: API.Decorator.Config.message(options, locale, translate(locale, ASSERT_FALSE)),
    }), API.Decorator.Config.groups(options));
}
