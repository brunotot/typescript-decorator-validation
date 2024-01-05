import API from "../../../../../index";
import { createFieldValidator } from "../../../../decorators";
import { translate } from "../../../../localization/service/TranslationService";
/** ValueMax identifier. */
export const VALUE_MAX = "ValueMax";
/** Internal validation function for {@link ValueMax} validator. */
function isValueMaxValid(num, max) {
  API.Utilities.Objects.assertType("number", num);
  return num == null ? true : num <= max;
}
/**
 * Checks if decorated number is not greater than given `max` parameter.
 *
 * @key {@link VALUE_MAX ValueMax}
 * @typeParam T - The type of the number property.
 * @param max - Maximum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueMax(5)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueMax(5, { message: "Maximum allowed value is 5" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueMax(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueMax(5, {
 *     message: "Maximum allowed value is 5",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function ValueMax(max, options) {
  return createFieldValidator(
    (value, _context, locale) => ({
      key: API.Decorators.key(options, VALUE_MAX),
      valid: isValueMaxValid(value, max),
      message: API.Decorators.message(options, locale, translate(locale, VALUE_MAX, max, value)),
    }),
    API.Decorators.groups(options)
  );
}
