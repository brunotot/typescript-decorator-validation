import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/** Positive identifier. */
export const POSITIVE = "Positive";

/** Internal validation function for {@link Positive} validator. */
function isPositiveValid(num: API.Utilities.Objects.Optional<number>): boolean {
  API.Utilities.Objects.assertType("number", num);
  return num !== undefined && num !== null && num > 0;
}

/**
 * Checks if decorated number is a positive number (number greater than 0).
 *
 * @key {@link POSITIVE Positive}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Positive()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Positive({ message: "Number value must be greater than 0" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Positive({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Positive({
 *     message: "Number value must be greater than 0",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function Positive<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (num, _context, locale) => ({
      key: API.Decorator.key(options, POSITIVE),
      valid: isPositiveValid(num),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, POSITIVE, num)
      ),
    }),
    API.Decorator.groups(options)
  );
}
