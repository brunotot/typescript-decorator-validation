import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import {
  evaluateNullableValidity,
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";

function isPastDate(date: Nullable<Date>): boolean {
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return d.getTime() < currentDate.getTime();
  });
}

export default function PastDate<T extends Nullable<Date>>(
  props?: BasicValidatorProviderType
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (date) => ({
      key: "PastDate",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.PastDate(date!)
      ),
      valid: isPastDate(date),
    }),
  });
}
