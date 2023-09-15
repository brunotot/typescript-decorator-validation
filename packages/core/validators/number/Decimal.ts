import { makeValidator } from "../../src/decorators/decorator.facade";

import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import ErrorMessage from "../../src/messages/model/errors";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";

export default function Decimal<T extends $.Nullable<number>>(
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