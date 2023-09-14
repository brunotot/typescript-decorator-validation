import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import ErrorMessage from "../../src/messages/model/errors";
import { $ } from "../../src/types/namespace/Utility.ns";
import {
  evaluateNullableValidity,
  extractGroups,
  extractMessage,
} from "../../src/utils/decorator.utils";

function isPastDate(date: $.Nullable<Date>): boolean {
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return d.getTime() < currentDate.getTime();
  });
}

export default function PastDate<T extends $.Nullable<Date>>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (date) => ({
      key: "PastDate",
      message: extractMessage(props, ErrorMessage.PastDate(date!)),
      valid: isPastDate(date),
    }),
  });
}
