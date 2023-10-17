import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/** NonNegative identifier. */
export const NON_NEGATIVE = "NonNegative";

/** Internal validation function for {@link NonNegative} validator. */
function isNonNegativeValid(
  num: API.Utilities.Objects.Optional<number>
): boolean {
  API.Utilities.Objects.assertType("number", num);
  return num !== undefined && num !== null && num >= 0;
}

/**
 * Checks if decorated number is not a negative number (can be 0).
 *
 * @key {@link NON_NEGATIVE NonNegative}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@NonNegative()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@NonNegative({ message: "Number value must not be a negative number" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@NonNegative({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@NonNegative({
 *     message: "Number value must not be a negative number",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function NonNegative<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (num, _context, locale) => ({
      key: API.Decorator.key(options, NON_NEGATIVE),
      valid: isNonNegativeValid(num),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, NON_NEGATIVE, num)
      ),
    }),
    API.Decorator.groups(options)
  );
}
