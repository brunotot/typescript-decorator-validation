import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import Decorator from "../../src/types/namespace/decorator.namespace";

export default function ArrayContains<K, T extends K[]>(
  props: Decorator.PartialProps<
    {
      value: K;
    },
    {
      value: K;
    }
  >
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArrayContains",
      message: extractMessage(props, ErrorMessage.ArrayContains(props.value)),
      valid: ((array ?? []) as any[]).includes(props.value),
    }),
  });
}
