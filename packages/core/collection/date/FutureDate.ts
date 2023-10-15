import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

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
 * @param options - Extra configuration props.
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
export function FutureDate<T extends API.Utilities.Objects.Optional<Date>>(
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (date, _context, locale) => ({
      key: API.Decorator.key(options, FUTURE_DATE),
      valid: isFutureDateValid(date),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, FUTURE_DATE, date)
      ),
    }),
    API.Decorator.groups(options)
  );
}
