import API from "api";

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
export default function TodayDate<
  T extends API.Utilities.Objects.Optional<Date>
>(props?: API.Decorator.Props.ZeroArgsMessageOptional) {
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (date, _context, locale) => {
      const currentDate = new Date();
      return {
        key: "TodayDate",
        message: API.Decorator.message(
          props,
          API.Localization.TranslationService.translate(
            locale,
            "TodayDate",
            date!
          ),
          locale
        ),
        valid:
          date &&
          date.getDate() === currentDate.getDate() &&
          date.getMonth() === currentDate.getMonth() &&
          date.getFullYear() === currentDate.getFullYear(),
      };
    },
  });
}
