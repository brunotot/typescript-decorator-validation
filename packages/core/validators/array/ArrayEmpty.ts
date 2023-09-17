import { makeValidator } from "../../src/decorators/decorator.facade";

import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";

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
