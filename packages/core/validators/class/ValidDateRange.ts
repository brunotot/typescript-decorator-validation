import API from "api";

/**
 * Creates a class decorator that validates if the date range is valid.
 *
 * @typeParam T - Class type that extends from ClassDecoratorService.Type.
 * @param {string} startDateFieldName - Field name for the start date.
 * @param {string} endDateFieldName - Field name for the end date.
 * @param {API.Decorator.Props.Base & API.Decorator.Props.MessageOptional} [props] - Optional properties for the decorator.
 * @returns {API.Decorator.Service.ClassDecoratorService.Instance<API.Utilities.Types.UnwrapClass<T>>} - Returns an instance of the class decorator.
 */
export function ValidDateRange<
  T extends API.Decorator.Service.ClassDecoratorService.Type
>(
  startDateFieldName: string,
  endDateFieldName: string,
  props?: API.Decorator.Props.Base & API.Decorator.Props.MessageOptional
): API.Decorator.Service.ClassDecoratorService.Instance<
  API.Utilities.Types.UnwrapClass<T>
> {
  return API.Decorator.Service.ClassDecoratorValidatorService.build({
    groups: API.Decorator.groups(props),
    isValid: (value, _context, locale) => ({
      key: "ValidDateRange",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "ValidDateRange",
          API.Utilities.Strings.convertCamelCaseToText(endDateFieldName, false),
          API.Utilities.Strings.convertCamelCaseToText(startDateFieldName)
        ),
        locale
      ),
      valid:
        value[startDateFieldName].getTime() < value[endDateFieldName].getTime(),
    }),
  });
}
