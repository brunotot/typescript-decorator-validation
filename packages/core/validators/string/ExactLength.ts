import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

export default function ExactLength<T extends $.Objects.Optional<string>>(
  props: Decorator.PartialProps<number>
) {
  const exact = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "ExactLength",
      message: extractMessage(props, ErrorMessage.ExactLength(exact)),
      valid: (value ?? "").length === exact,
    }),
  });
}
