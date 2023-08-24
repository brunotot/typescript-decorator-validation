import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";
import { hasValue } from "../../src/utils/object.utils";

export default function Required<T extends $.Nullable>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Required",
      message: extractMessage(props, ErrorMessage.Required()),
      valid: hasValue(value),
    }),
  });
}
