import API from "api";

export default function ValidDateRange<
  T extends API.Decorator.ClassBaseDecorator.Type
>(
  startDateFieldName: string,
  endDateFieldName: string,
  props?: API.Decorator.Props.Base & API.Decorator.Props.MessageOptional
): API.Decorator.ClassBaseDecorator.Instance<
  API.Utilities.Types.UnwrapClass<T>
> {
  return API.Decorator.ClassValidatorDecorator.build({
    groups: API.Decorator.groups(props),
    isValid: (value, _context, locale) => ({
      key: "ValidDateRange",
      message: API.Decorator.message(
        props,
        API.Localization.TranslationService.translate(
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
