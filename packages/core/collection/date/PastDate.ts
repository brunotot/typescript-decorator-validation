import API from "api";

/** PastDate identifier. */
export const PAST_DATE = "PastDate";

/** Internal validation function for {@link PastDate} validator. */
export function isPastDateValid<T extends API.Utilities.Objects.Optional<Date>>(
  date: T
): boolean {
  API.Utilities.Objects.assertType("date", date);
  return date && date.getTime() < new Date().getTime();
}

/**
 * Checks if a {@link Date} is in the past.
 *
 * @key {@link PAST_DATE PastDate}
 * @typeParam T - The type of the date property.
 * @param props - The custom error message or an object with an error message and optional arguments.
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   _@PastDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   _@PastDate({ message: "Date must be in the past" })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   _@PastDate({ groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   _@PastDate({ groups: ["UPDATE"], message: "Date must be in the past" })
 *   date: Date;
 * }
 * ```
 */
export function PastDate<T extends API.Utilities.Objects.Optional<Date>>(
  props?: API.Decorator.Props.ZeroArgsMessageOptional
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (date, _context, locale) => ({
      key: PAST_DATE,
      message: API.Decorator.message(props, locale, PAST_DATE, date),
      valid: isPastDateValid(date),
    }),
  });
}
