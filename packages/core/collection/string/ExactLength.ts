import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/** ExactLength identifier. */
export const EXACT_LENGTH = "ExactLength";

/** Internal validation function for {@link ExactLength} validator. */
export function isExactLengthValid(
  value: API.Utilities.Objects.Optional<string>,
  exact: number
): boolean {
  API.Utilities.Objects.assertType("string", value);
  return (value ?? API.Utilities.Strings.EMPTY).length === exact;
}

/**
 * Checks if the decorated string contains a specific number of characters.
 *
 * @key {@link EXACT_LENGTH ExactLength}
 * @typeParam T - The type of the decorated property (nullable string) - optional if used in decorator context.
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Address {
 *   _@ExactLength(2)
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Address {
 *   _@ExactLength({ value: 2, message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Address {
 *   _@ExactLength({ value: 2, groups: ["UPDATE"] })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Address {
 *   _@ExactLength({ value: 2, groups: ["UPDATE"], message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 */
export function ExactLength<T extends API.Utilities.Objects.Optional<string>>(
  exact: number,
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: API.Decorator.key(options, EXACT_LENGTH),
      valid: isExactLengthValid(value, exact),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, EXACT_LENGTH, exact)
      ),
    }),
    API.Decorator.groups(options)
  );
}
