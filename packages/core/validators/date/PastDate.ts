import API from "api";

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
export default function PastDate<
  T extends API.Utilities.Objects.Optional<Date>
>(props?: API.Decorator.Props.ZeroArgsMessageOptional) {
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (date, _context, locale) => ({
      key: "PastDate",
      message: API.Decorator.message(
        props,
        API.Localization.TranslationService.translate(
          locale,
          "PastDate",
          date!
        ),
        locale
      ),
      valid: date && date.getTime() < new Date().getTime(),
    }),
  });
}
