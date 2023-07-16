import ValidatorFactory from "../../common/ValidatorFactory";
import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import {
  evaluateNullableValidity,
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../src/model/utility/object.utility";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../../src/model/utility/type.utility";

function isTodayDate(date: Nullable<Date>): boolean {
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return (
      d.getDate() === currentDate.getDate() &&
      d.getMonth() === currentDate.getMonth() &&
      d.getFullYear() === currentDate.getFullYear()
    );
  });
}

export default function TodayDate<T extends Nullable<Date>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (date) => ({
      key: "TodayDate",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.TodayDate(date!)
      ),
      valid: isTodayDate(date),
    }),
  });
}
