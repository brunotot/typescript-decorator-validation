import makeValidator from "../../src/decorators/decorator.facade";
import {
  evaluateNullableValidity,
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Decorator for validating if a date is in the future.
 *
 * @typeParam T - The type of the date property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Event {
 *   @FutureDate()
 *   eventDate: Date;
 * }
 * ```
 * This example applies the `FutureDate` validator to the `eventDate` property to ensure it is a date in the future.
 */
function isFutureDate(date: $.Objects.Optional<Date>): boolean {
  // TODO: Maybe bump nullable validity to higher hierarchy
  return evaluateNullableValidity(date, (d) => {
    const currentDate = new Date();
    return d.getTime() > currentDate.getTime();
  });
}

export default function FutureDate<T extends $.Objects.Optional<Date>>(
  props?: Decorator.PartialProps
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
