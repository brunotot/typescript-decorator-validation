import API from "../../../../../index";
import { createFieldValidator } from "../../../../decorators";
import { translate } from "../../../../localization/service/TranslationService";
/** Integer identifier. */
export const INTEGER = "Integer";
/** Internal validation function for {@link Integer} validator. */
function isIntegerValid(num) {
    API.Utilities.Objects.assertType("number", num);
    return num !== undefined && num !== null && Number.isInteger(num);
}
/**
 * Checks if decorated number is an integer number.
 *
 * @key {@link INTEGER Integer}
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
export function Integer(options) {
    return createFieldValidator((num, _context, locale) => ({
        key: API.Decorator.Config.key(options, INTEGER),
        valid: isIntegerValid(num),
        message: API.Decorator.Config.message(options, locale, translate(locale, INTEGER, num)),
    }), API.Decorator.Config.groups(options));
}
