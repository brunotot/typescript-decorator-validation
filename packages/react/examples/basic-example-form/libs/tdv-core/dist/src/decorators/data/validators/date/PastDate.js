import { translate } from "../../../../localization";
import { Objects } from "../../../../utilities";
import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
/** Internal validation function for {@link PastDate} validator. */
function isPastDateValid(date) {
  Objects.assertType("date", date);
  return date && date.getTime() < new Date().getTime();
}
/**
 * Checks if a {@link Date} is in the past.
 *
 * @key {@link DecoratorKeys.PAST_DATE}
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
export function PastDate(options) {
  return createFieldValidator(
    (date, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.PAST_DATE),
      valid: isPastDateValid(date),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.PAST_DATE, date)),
    }),
    buildGroupsProp(options)
  );
}
