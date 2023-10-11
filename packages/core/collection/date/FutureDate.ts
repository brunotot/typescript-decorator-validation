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
 *   _@FutureDate({ message: "Date must be in the future" })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   _@FutureDate({ groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   _@FutureDate({ groups: ["UPDATE"], message: "Date must be in the future" })
 *   date: Date;
 * }
 * ```
 */
export function FutureDate<T extends API.Utilities.Objects.Optional<Date>>(
  props?: API.Decorator.Props.ZeroArgsMessageOptional
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (date, _context, locale) => ({
      key: FUTURE_DATE,
      message: API.Decorator.message(props, locale, FUTURE_DATE, date),
      valid: isFutureDateValid(date),
    }),
  });
}
