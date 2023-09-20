import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

export default function Length<T extends $.Objects.Optional<string>>(
  props: Decorator.ImpartialProps<{
    min: number;
    max: number;
  }>
) {
  const { min, max } = props;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Length",
      message: extractMessage(props, ErrorMessage.RangeLength(min, max)),
      valid: (value ?? "").length >= min && (value ?? "").length <= max,
    }),
  });
}
