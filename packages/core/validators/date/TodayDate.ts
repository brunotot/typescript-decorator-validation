import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import ErrorMessage from "../../src/messages/model/errors";
import { $ } from "../../src/types/namespace/Utility.ns";
import {
  evaluateNullableValidity,
  extractGroups,
  extractMessage,
} from "../../src/utils/decorator.utils";

function isTodayDate(date: $.Nullable<Date>): boolean {
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return (
      d.getDate() === currentDate.getDate() &&
      d.getMonth() === currentDate.getMonth() &&
      d.getFullYear() === currentDate.getFullYear()
    );
  });
}

export default function TodayDate<T extends $.Nullable<Date>>(
  props?: DecoratorPartialProps
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
