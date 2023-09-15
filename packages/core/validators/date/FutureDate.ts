import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  evaluateNullableValidity,
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/model/errors";
import { $ } from "../../src/types/namespace/Utility.ns";

function isFutureDate(date: $.Nullable<Date>): boolean {
  // TODO: Maybe bump nullable validity to higher hierarchy
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return d.getTime() > currentDate.getTime();
  });
}

export default function FutureDate<T extends $.Nullable<Date>>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (date) => ({
      key: "FutureDate",
      message: extractMessage(props, ErrorMessage.FutureDate(date!)),
      valid: isFutureDate(date),
    }),
  });
}
