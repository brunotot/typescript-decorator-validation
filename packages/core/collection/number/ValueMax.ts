import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/** ValueMax identifier. */
export const VALUE_MAX = "ValueMax";

/** Internal validation function for {@link ValueMax} validator. */
function isValueMaxValid(
  num: API.Utilities.Objects.Optional<number>,
  max: number
): boolean {
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
export function ValueMax<T extends API.Utilities.Objects.Optional<number>>(
  max: number,
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: API.Decorator.key(options, VALUE_MAX),
      valid: isValueMaxValid(value, max),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, VALUE_MAX, max, value)
      ),
    }),
    API.Decorator.groups(options)
  );
}
