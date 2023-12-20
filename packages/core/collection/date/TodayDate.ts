import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";

/** TodayDate identifier. */
export const TODAY_DATE = "TodayDate";

/** Internal validation function for {@link TodayDate} validator. */
export function isTodayDateValid<T extends API.Utilities.Objects.Optional<Date>>(date: T): boolean {
  API.Utilities.Objects.assertType("date", date);
  const currentDate = new Date();
  return (
    date &&
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
}

/**
 * Checks if a {@link Date} is the today's date based on year, month and day.
 *
 * @key {@link TODAY_DATE TodayDate}
 * @typeParam T - The type of the date property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@TodayDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@TodayDate({ message: "The date must be today" })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@TodayDate({ groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@TodayDate({
 *     message: "The date must be today",
 *     groups: ["UPDATE"]
 *   })
 *   date: Date;
 * }
 * ```
 */
export function TodayDate<T extends API.Utilities.Objects.Optional<Date>>(
  options?: API.Decorator.Config.Options
): API.Decorator.ForField.Basic.Instance<T> {
  return API.Decorator.ForField.Validator.build<T>(
    (date, _context, locale) => ({
      key: API.Decorator.Config.key(options, TODAY_DATE),
      valid: isTodayDateValid(date),
      message: API.Decorator.Config.message(options, locale, translate(locale, TODAY_DATE, date)),
    }),
    API.Decorator.Config.groups(options)
  );
}
