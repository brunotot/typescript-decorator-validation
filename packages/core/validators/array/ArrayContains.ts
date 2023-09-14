import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import ErrorMessage from "../../src/messages/model/errors";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";

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
