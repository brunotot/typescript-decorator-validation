import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  evaluateNullableValidity,
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

function isPastDate(date: NullableType<Date>): boolean {
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return d.getTime() < currentDate.getTime();
  });
}

export default function PastDate<T extends NullableType<Date>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (date) => ({
      key: "PastDate",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.PastDate(date)
      ),
      valid: isPastDate(date),
    }),
  });
}
