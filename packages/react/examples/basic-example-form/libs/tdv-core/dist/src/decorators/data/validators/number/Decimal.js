import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
/** `@Decimal` key. */
export const DECIMAL = "Decimal";
/** Internal validation function for {@link Decimal} validator. */
function isDecimalValid(value) {
    Objects.assertType("number", value);
    return value !== undefined && value !== null && !Number.isInteger(value);
}
/**
 * Checks if decorated number is a decimal number.
 *
 * @key {@link DECIMAL Decimal}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Decimal()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Decimal({ message: "Number must be a decimal" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Decimal({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Decimal({
 *     message: "Number must be a decimal",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function Decimal(options) {
    return createFieldValidator((value, _context, locale) => ({
        key: buildKeyProp(options, DECIMAL),
        valid: isDecimalValid(value),
        message: buildMessageProp(options, locale, translate(locale, DECIMAL, value)),
    }), buildGroupsProp(options));
}
