import API from "api";

/** FutureDate identifier. */
export const FUTURE_DATE = "FutureDate";

/** Internal validation function for {@link FutureDate} validator. */
export function isFutureDateValid<
  T extends API.Utilities.Objects.Optional<Date>
>(date: T): boolean {
  API.Utilities.Objects.assertType("date", date);
  return date && date.getTime() > new Date().getTime();
}

/**
 * Checks if a {@link Date} is in the future.
 *
 * @key {@link FUTURE_DATE FutureDate}
 * @typeParam T - The type of the date property.
 * @param props - The custom error message or an object with an error message and optional arguments.
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   _@FutureDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   _@FutureDate("Date must be in the future")
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   _@FutureDate(undefined, { groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   _@FutureDate("Date must be in the future", { groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 */
export function FutureDate<T extends API.Utilities.Objects.Optional<Date>>(
  message?: string,
  config?: API.Decorator.Props.Base
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (date, _context, locale) => ({
      key: FUTURE_DATE,
      message: API.Decorator.message(message, locale, FUTURE_DATE, date),
      valid: isFutureDateValid(date),
    }),
    config
  );
}
