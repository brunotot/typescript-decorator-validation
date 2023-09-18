import { makeValidator } from "../../src/decorators/decorator.facade";
import { extractMessage } from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

export default function NonPositive<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    isValid: (num) => ({
      key: "NonPositive",
      message: extractMessage(props, ErrorMessage.NonPositive(num!)),
      valid: num !== undefined && num !== null && num <= 0,
    }),
  });
}
