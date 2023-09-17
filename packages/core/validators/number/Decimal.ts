import { makeValidator } from "../../src/decorators/decorator.facade";

import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";

export default function Decimal<T extends $.Objects.Optional<number>>(
  props?: DecoratorPartialProps<number>
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Decimal",
      message: extractMessage(props, ErrorMessage.Decimal(value!)),
      valid: value !== undefined && value !== null && !Number.isInteger(value),
    }),
  });
}
