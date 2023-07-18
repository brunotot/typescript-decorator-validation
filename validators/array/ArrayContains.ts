import { makeValidator } from "../../src/decorators/facade/validator.facade";

import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups, extractMessage } from "../../src/utils/object.utils";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";

export type ArrayContainsType<T> = {
  value: T;
};

export default function ArrayContains<K, T extends K[]>(
  props: DecoratorPartialProps<ArrayContainsType<K>, ArrayContainsType<K>>
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
