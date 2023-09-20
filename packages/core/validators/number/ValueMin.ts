import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

export default function ValueMin<T extends $.Objects.Optional<number>>(
  props: Decorator.PartialProps<
    number,
    {
      value: number;
    }
  >
) {
  const min = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "ValueMin",
      message: extractMessage(props, ErrorMessage.ValueMin(min, value!)),
      valid: value == null ? true : value >= min,
    }),
  });
}
