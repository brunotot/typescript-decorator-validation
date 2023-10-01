import Decorator from "../../src/decorators";
import ClassDecorator from "../../src/decorators/kind/ClassDecorator";
import ClassValidatorDecorator from "../../src/decorators/kind/derived/ClassValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import Types from "../../src/types/namespace/types.namespace";

function camelCaseToNormalText(
  camelCase: string,
  capitalizeFirstLetter: boolean = true
): string {
  let result = camelCase
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/ (\w)/g, (str) => str.toLowerCase());

  if (capitalizeFirstLetter) {
    result = result.replace(/^./, (str) => str.toUpperCase());
  }

  return result;
}

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
        TranslationService.translate(
          locale,
          "ValidDateRange",
          camelCaseToNormalText(startDateFieldName),
          camelCaseToNormalText(endDateFieldName, false)
        ),
        locale
      ),
      valid:
        value[startDateFieldName].getTime() < value[endDateFieldName].getTime(),
    }),
  });
}
