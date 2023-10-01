import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";
import Validation from "../../src/types/namespace/validation.namespace";

/**
 * Decorator for validating if a date is in the past.
 *
 * @typeParam T - The type of the date property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Event {
 *   @PastDate()
 *   eventDate: Date;
 * }
 * ```
 * This example applies the `PastDate` validator to the `eventDate` property to ensure it is a date in the past.
 */
export default function PastDate<T extends $.Objects.Optional<Date>>(
  props?: Decorator.PartialProps
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    isValid: (date, _context, locale) => ({
      key: "PastDate",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "PastDate", date!),
        locale
      ),
      valid: Validation.isValidNullable(
        date,
        (d) => d.getTime() < new Date().getTime()
      ),
    }),
  });
}
