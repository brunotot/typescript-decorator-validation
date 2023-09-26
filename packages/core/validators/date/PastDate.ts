import makeValidator from "../../src/decorators/decorator.facade";
import {
  evaluateNullableValidity,
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/error-messages";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

function isPastDate(date: $.Objects.Optional<Date>): boolean {
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return d.getTime() < currentDate.getTime();
  });
}

/**
 * Decorator for validating if a date is in the past.
 *
 * @typeParam T - The type of the date property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Event {
 *   @PastDate()
 *   eventDate: Date;
 * }
 * ```
 * This example applies the `PastDate` validator to the `eventDate` property to ensure it is a date in the past.
 */
export default function PastDate<T extends $.Objects.Optional<Date>>(
  props?: Decorator.PartialProps
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
