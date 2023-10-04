import Decorator from "../../src/decorators";
import ClassDecorator from "../../src/decorators/kind/ClassDecorator";
import ClassValidatorDecorator from "../../src/decorators/kind/derived/ClassValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import Strings from "../../src/utilities/impl/Strings";
import Types from "../../src/utilities/impl/Types";

export default function ValidDateRange<T extends ClassDecorator.Type>(
  startDateFieldName: string,
  endDateFieldName: string,
  props?: Decorator.Props.Base & Decorator.Props.MessageOptional
): ClassDecorator.Instance<Types.UnwrapClass<T>> {
  return ClassValidatorDecorator.build({
    groups: Decorator.groups(props),
    isValid: (value, _context, locale) => ({
      key: "ValidDateRange",
      message: Decorator.message(
        props,
        TranslationService.translate(
          locale,
          "ValidDateRange",
          Strings.convertCamelCaseToText(startDateFieldName),
          Strings.convertCamelCaseToText(endDateFieldName, false)
        ),
        locale
      ),
      valid:
        value[startDateFieldName].getTime() < value[endDateFieldName].getTime(),
    }),
  });
}
