import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";

export default function Negative<T extends $.Objects.Optional<number>>(
  props?: DecoratorPartialProps
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
