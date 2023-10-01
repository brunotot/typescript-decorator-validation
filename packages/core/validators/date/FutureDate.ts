import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";
import Validation from "../../src/types/namespace/validation.namespace";

/**
 * Decorator for validating if a date is in the future.
 *
 * @typeParam T - The type of the date property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Event {
 *   @FutureDate()
 *   eventDate: Date;
 * }
 * ```
 * This example applies the `FutureDate` validator to the `eventDate` property to ensure it is a date in the future.
 */
export default function FutureDate<T extends $.Objects.Optional<Date>>(
  props?: Decorator.PartialProps
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    isValid: (date, _context, locale) => ({
      key: "FutureDate",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "FutureDate", date!),
        locale
      ),
      valid: Validation.isValidNullable(
        date,
        (d) => d.getTime() > new Date().getTime()
      ),
    }),
  });
}
