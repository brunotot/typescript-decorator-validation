import { makeValidator } from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import Decorator from "../../src/types/namespace/decorator.namespace";

export default function ArrayEmpty<K, T extends K[]>(
  props?: Decorator.PartialProps
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
