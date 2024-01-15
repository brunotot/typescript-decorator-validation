import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { type FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { type DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link TodayDate} validator. */
function isTodayDateValid<T extends Objects.Optional<Date>>(date: T): boolean {
  Objects.assertType("date", date);
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
 * @key {@link DecoratorKeys.TODAY_DATE}
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
export function TodayDate<T extends Objects.Optional<Date>>(options?: DecoratorOptions): FieldDecorator<T> {
  return createFieldValidator<T>(
    (date, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.TODAY_DATE),
      valid: isTodayDateValid(date),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.TODAY_DATE, date)),
    }),
    buildGroupsProp(options)
  );
}
