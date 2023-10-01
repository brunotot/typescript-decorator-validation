import Decorator from "../../src/decorators";
import ClassDecorator from "../../src/decorators/kind/ClassDecorator";
import ClassValidatorDecorator from "../../src/decorators/kind/derived/ClassValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import Types from "../../src/types/namespace/types.namespace";

export default function ValidDateRange<T extends ClassDecorator.Type>(
  startDateFieldName: string,
  endDateFieldName: string,
  props?: Decorator.BaseProps
): ClassDecorator.Instance<Types.UnwrapClass<T>> {
  return ClassValidatorDecorator.build({
    groups: Decorator.groups(props),
    isValid: (value, _context, locale) => ({
      key: "ValidDateRange",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "ValidDateRange"),
        locale
      ),
      valid:
        value[startDateFieldName].getTime() < value[endDateFieldName].getTime(),
    }),
  });
}
