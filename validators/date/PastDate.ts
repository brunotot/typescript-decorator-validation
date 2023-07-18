import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { $ } from "../../src/types/namespace/Utility.ns";
import {
  evaluateNullableValidity,
  extractGroups,
  extractMessage,
} from "../../src/utils/object.utils";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";

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
