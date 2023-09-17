import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import { hasValue } from "../../src/shared";
import { $ } from "../../src/types/namespace/Utility.ns";

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
