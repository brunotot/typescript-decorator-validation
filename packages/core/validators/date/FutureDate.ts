import Decorator from "../../src/decorators";
import {
  extractGroups,
  extractMessage,
  isValidNullable,
} from "../../src/decorators/decorator.utils";
import ValidatorService from "../../src/decorators/service/validator.service";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

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
  return ValidatorService.create<T>({
    groups: extractGroups(props),
    isValid: (date, _context, locale) => ({
      key: "FutureDate",
      message: extractMessage(
        props,
        TranslationService.translate(locale, "FutureDate", date!),
        locale
      ),
      valid: isValidNullable(date, (d) => d.getTime() > new Date().getTime()),
    }),
  });
}
