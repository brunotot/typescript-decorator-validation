import API from "../../../../../index";
import { type FieldDecorator, createFieldValidator } from "../../../../decorators";
import { translate } from "../../../../localization/service/TranslationService";

/** Negative identifier. */
export const NEGATIVE = "Negative";

/** Internal validation function for {@link Negative} validator. */
function isNegativeValid(num: API.Utilities.Objects.Optional<number>): boolean {
  API.Utilities.Objects.assertType("number", num);
  return num !== undefined && num !== null && num < 0;
}

/**
 * Checks if decorated number is a negative number (number less than 0).
 *
 * @key {@link NEGATIVE Negative}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Negative()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Negative({ message: "Number value must be less than 0" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Negative({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Negative({
 *     message: "Number value must be less than 0",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function Negative<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorator.Config.Options
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (num, _context, locale) => ({
      key: API.Decorator.Config.key(options, NEGATIVE),
      valid: isNegativeValid(num),
      message: API.Decorator.Config.message(options, locale, translate(locale, NEGATIVE, num)),
    }),
    API.Decorator.Config.groups(options)
  );
}
