import API from "api";

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
