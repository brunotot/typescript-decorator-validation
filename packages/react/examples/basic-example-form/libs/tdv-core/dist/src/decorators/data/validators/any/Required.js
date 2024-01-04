import API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createFieldValidator } from "../../../index";
/** Required identifier. */
export const REQUIRED = "Required";
/**
 * Checks if a value is not `null`, `undefined`, `false`, an empty array, an empty string, or an invalid Date.
 *
 * @typeParam T - The type of the value.
 */
export function isRequiredValid(value) {
    return !(value === undefined ||
        value === null ||
        value === false ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "string" && value.trim().length === 0) ||
        (value instanceof Date && value.toString() === "Invalid Date"));
}
/**
 * Creates a validator decorator which requires that a value must be present.
 *
 * @key {@link REQUIRED Required}
 * @typeParam T - The type of the decorated property (any class field).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use with class fields.
 *
 * @example
 * Example 1: Basic usage
 * ```ts
 * class Product {
 *   \@Required()
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 2: Supplying a custom error message
 * ```ts
 * class Product {
 *   \@Required({ message: "Product name is mandatory" })
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 3: Supplying a custom error message and groups
 * ```ts
 * class Product {
 *   \@Required({
 *     message: "Product name is mandatory",
 *     groups: ["CREATE"]
 *   })
 *   name: string;
 * }
 * ```
 */
export function Required(options) {
    return createFieldValidator((value, _context, locale) => ({
        key: API.Decorator.Config.key(options, REQUIRED),
        valid: isRequiredValid(value),
        message: API.Decorator.Config.message(options, locale, translate(locale, REQUIRED)),
    }), API.Decorator.Config.groups(options));
}
