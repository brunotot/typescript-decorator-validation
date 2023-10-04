import Decorator from "../../src/decorators";
import ClassDecorator from "../../src/decorators/kind/ClassDecorator";
import ClassValidatorDecorator from "../../src/decorators/kind/derived/ClassValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import Types from "../../src/types/namespace/types.namespace";
import StringUtils from "../../src/utils/StringUtils";

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
          StringUtils.convertCamelCaseToText(startDateFieldName),
          StringUtils.convertCamelCaseToText(endDateFieldName, false)
        ),
        locale
      ),
      valid:
        value[startDateFieldName].getTime() < value[endDateFieldName].getTime(),
    }),
  });
}
