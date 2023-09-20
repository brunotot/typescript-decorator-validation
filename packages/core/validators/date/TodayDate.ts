import makeValidator from "../../src/decorators/decorator.facade";
import {
  evaluateNullableValidity,
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

function isTodayDate(date: $.Objects.Optional<Date>): boolean {
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return (
      d.getDate() === currentDate.getDate() &&
      d.getMonth() === currentDate.getMonth() &&
      d.getFullYear() === currentDate.getFullYear()
    );
  });
}

export default function TodayDate<T extends $.Objects.Optional<Date>>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (date) => ({
      key: "TodayDate",
      message: extractMessage(props, ErrorMessage.TodayDate(date!)),
      valid: isTodayDate(date),
    }),
  });
}
