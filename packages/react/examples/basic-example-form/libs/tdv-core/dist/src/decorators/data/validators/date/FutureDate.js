import API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createFieldValidator } from "../../../index";
/** FutureDate identifier. */
export const FUTURE_DATE = "FutureDate";
/** Internal validation function for {@link FutureDate} validator. */
export function isFutureDateValid(date) {
  API.Utilities.Objects.assertType("date", date);
  return date && date.getTime() > new Date().getTime();
}
/**
 * Checks if a {@link Date} is in the future.
 *
 * @key {@link FUTURE_DATE FutureDate}
 * @typeParam T - The type of the date property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@FutureDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@FutureDate({ message: "Date must be in the future" })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@FutureDate({ groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@FutureDate({
 *     message: "Date must be in the future",
 *     groups: ["UPDATE"]
 *   })
 *   date: Date;
 * }
 * ```
 */
export function FutureDate(options) {
  return createFieldValidator(
    (date, _context, locale) => ({
      key: API.Decorators.key(options, FUTURE_DATE),
      valid: isFutureDateValid(date),
      message: API.Decorators.message(options, locale, translate(locale, FUTURE_DATE, date)),
    }),
    API.Decorators.groups(options)
  );
}
