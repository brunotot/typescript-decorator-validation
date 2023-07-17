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
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (date) => ({
      key: "FutureDate",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.FutureDate(date!)
      ),
      valid: isFutureDate(date),
    }),
  });
}
