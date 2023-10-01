import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";
import Validation from "../../src/types/namespace/validation.namespace";

/**
 * Decorator for validating if a date is today's date.
 *
 * @typeParam T - The type of the date property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Task {
 *   @TodayDate()
 *   dueDate: Date;
 * }
 * ```
 * This example applies the `TodayDate` validator to the `dueDate` property to ensure it is set to today's date.
 */
export default function TodayDate<T extends $.Objects.Optional<Date>>(
  props?: Decorator.PartialProps
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    isValid: (date, _context, locale) => ({
      key: "TodayDate",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "TodayDate", date!),
        locale
      ),
      valid: Validation.isValidNullable(date, (d) => {
        const currentDate = new Date();
        return (
          d.getDate() === currentDate.getDate() &&
          d.getMonth() === currentDate.getMonth() &&
          d.getFullYear() === currentDate.getFullYear()
        );
      }),
    }),
  });
}
