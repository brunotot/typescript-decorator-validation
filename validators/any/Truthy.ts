import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups, extractMessage } from "../../src/utils/object.utils";
import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { $ } from "../../src/types/namespace/Utility.ns";

export default function Truthy<T extends $.Nullable>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Truthy",
      message: extractMessage(props, ErrorMessage.Truthy()),
      valid: !!value,
    }),
  });
}
