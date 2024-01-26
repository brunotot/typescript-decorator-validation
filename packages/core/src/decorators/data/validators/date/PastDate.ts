import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { createFieldValidator, type FieldDecorator } from "@decorators/factory/forField";
import {
  buildDecoratorMeta,
  buildKeyProp,
  buildMessageProp,
  type DecoratorOptions,
} from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link PastDate} validator. */
function isPastDateValid<T extends Objects.Optional<Date>>(date: T): boolean {
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
export function PastDate<This, Value extends Objects.Optional<Date>>(
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (date, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.PAST_DATE),
      valid: isPastDateValid(date),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.PAST_DATE, date)),
    }),
    buildDecoratorMeta(options)
  );
}
