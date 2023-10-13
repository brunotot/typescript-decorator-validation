import API from "api";

/** TodayDate identifier. */
export const TODAY_DATE = "TodayDate";

/** Internal validation function for {@link TodayDate} validator. */
export function isTodayDateValid<
  T extends API.Utilities.Objects.Optional<Date>
>(date: T): boolean {
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
 * @param props - The custom error message or an object with an error message and optional arguments.
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   _@TodayDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   _@TodayDate("The date must be today")
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   _@TodayDate(undefined, { groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   _@TodayDate("The date must be today", { groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 */
export function TodayDate<T extends API.Utilities.Objects.Optional<Date>>(
  message?: string,
  config?: API.Decorator.Props.Base
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (date, _context, locale) => ({
      key: TODAY_DATE,
      message: API.Decorator.message(message, locale, TODAY_DATE, date),
      valid: isTodayDateValid(date),
    }),
    config
  );
}
