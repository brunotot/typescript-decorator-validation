import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";
import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { $ } from "../../src/types/namespace/Utility.ns";

export default function Falsy<T extends $.Nullable>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Falsy",
      message: extractMessage(props, ErrorMessage.Falsy()),
      valid: !value,
    }),
  });
}
