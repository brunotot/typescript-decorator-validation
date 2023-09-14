import { makeValidator } from "../../src/decorators/decorator.facade";

import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import ErrorMessage from "../../src/messages/model/errors";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";

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
