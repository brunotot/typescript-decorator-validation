import API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createFieldValidator } from "../../../index";
/** Decimal identifier. */
export const DECIMAL = "Decimal";
/** Internal validation function for {@link Decimal} validator. */
export function isDecimalValid(value) {
  API.Utilities.Objects.assertType("number", value);
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
  return createFieldValidator(
    (value, _context, locale) => ({
      key: API.Decorators.key(options, DECIMAL),
      valid: isDecimalValid(value),
      message: API.Decorators.message(options, locale, translate(locale, DECIMAL, value)),
    }),
    API.Decorators.groups(options)
  );
}
