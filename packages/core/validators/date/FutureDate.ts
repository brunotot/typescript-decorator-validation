import API from "api";

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
export function FutureDate<T extends API.Utilities.Objects.Optional<Date>>(
  props?: API.Decorator.Props.ZeroArgsMessageOptional
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (date, _context, locale) => ({
      key: "FutureDate",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "FutureDate",
          date!
        ),
        locale
      ),
      valid: date && date.getTime() > new Date().getTime(),
    }),
  });
}
