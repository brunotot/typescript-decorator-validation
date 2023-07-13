import ValidatorService, { Nullable } from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  evaluateNullableValidity,
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

function isFutureDate(date: Nullable<Date>): boolean {
  // TODO: Maybe bump nullable validity to higher hierarchy
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return d.getTime() > currentDate.getTime();
  });
}

export default function FutureDate<T extends Nullable<Date>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (date) => ({
      key: "FutureDate",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.FutureDate(date)
      ),
      valid: isFutureDate(date),
    }),
  });
}
