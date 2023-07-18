import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { $ } from "../../src/types/namespace/Utility.ns";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups, extractMessage } from "../../src/utils/object.utils";

export default function Positive<T extends $.Nullable<number>>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (num) => ({
      key: "Positive",
      message: extractMessage(props, ErrorMessage.Positive(num!)),
      valid: num !== undefined && num !== null && num > 0,
    }),
  });
}
