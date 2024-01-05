import API from "../../../../../index";
import { createFieldValidator } from "../../../../decorators";
import { translate } from "../../../../localization/service/TranslationService";
/** MinLength identifier. */
export const MIN_LENGTH = "MinLength";
/** Internal validation function for {@link MinLength} validator. */
export function isMinLengthValid(value, min) {
  API.Utilities.Objects.assertType("string", value);
  return (value !== null && value !== void 0 ? value : "").length >= min;
}
/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link MIN_LENGTH MinLength}
 * @typeParam T - The type of the string property.
 * @param min - Minimum length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@MinLength(5)
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@MinLength(5, { message: "Input must contain at least 5 characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@MinLength(5, { groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@MinLength(5, { groups: ["UPDATE"], message: "Input must contain at least 5 characters" })
 *   input: string;
 * }
 * ```
 */
export function MinLength(min, options) {
  return createFieldValidator(
    (value, _context, locale) => ({
      key: API.Decorators.key(options, MIN_LENGTH),
      valid: isMinLengthValid(value, min),
      message: API.Decorators.message(options, locale, translate(locale, MIN_LENGTH, min)),
    }),
    API.Decorators.groups(options)
  );
}