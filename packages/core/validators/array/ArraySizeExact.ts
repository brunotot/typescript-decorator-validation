import makeValidator from "../../src/decorators/decorator.facade";
import Decorator from "../../src/types/namespace/decorator.namespace";

import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";

export default function ArraySizeExact<K, T extends K[]>(
  props: Decorator.PartialProps<
    number,
    {
      value: number;
    }
  >
) {
  const exact = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArraySizeExact",
      message: extractMessage(
        props,
        ErrorMessage.ArraySizeExact(exact, (array ?? []).length)
      ),
      valid: (array ?? []).length === exact,
    }),
  });
}
