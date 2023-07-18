import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups, extractMessage } from "../../src/utils/object.utils";

export default function ArrayEmpty<K, T extends K[]>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArrayEmpty",
      message: extractMessage(props, ErrorMessage.ArrayEmpty()),
      valid: (array ?? []).length === 0,
    }),
  });
}
