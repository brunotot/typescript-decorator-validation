import * as API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createFieldValidator, type FieldDecorator } from "../../../index";

/** `@PastDate` key. */
export const PAST_DATE = "PastDate";

/** Internal validation function for {@link PastDate} validator. */
function isPastDateValid<T extends API.Utilities.Objects.Optional<Date>>(date: T): boolean {
  API.Utilities.Objects.assertType("date", date);
  return date && date.getTime() < new Date().getTime();
}

/**
 * Checks if a {@link Date} is in the past.
 *
 * @key {@link PAST_DATE PastDate}
 * @typeParam T - The type of the date property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@PastDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@PastDate({ message: "Date must be in the past" })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@PastDate({ groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@PastDate({
 *     message: "Date must be in the past",
 *     groups: ["UPDATE"]
 *   })
 *   date: Date;
 * }
 * ```
 */
export function PastDate<T extends API.Utilities.Objects.Optional<Date>>(
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (date, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, PAST_DATE),
      valid: isPastDateValid(date),
      message: API.Decorators.buildMessageProp(options, locale, translate(locale, PAST_DATE, date)),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}
