import { makeValidator } from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

export default function Negative<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (num) => ({
      key: "Negative",
      message: extractMessage(props, ErrorMessage.Negative(num!)),
      valid: num !== undefined && num !== null && num < 0,
    }),
  });
}
