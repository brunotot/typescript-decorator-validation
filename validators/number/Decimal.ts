import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";
import { $ } from "../../src/types/namespace/Utility.ns";

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
