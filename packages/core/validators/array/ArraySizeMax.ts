import { makeValidator } from "../../src/decorators/decorator.facade";

import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/model/errors";

type ArraySizeMaxType = {
  value: number;
};

export default function ArraySizeMax<K, T extends K[]>(
  props: DecoratorPartialProps<number, ArraySizeMaxType>
) {
  const max = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArraySizeMax",
      message: extractMessage(
        props,
        ErrorMessage.ArraySizeMax(max, (array ?? []).length)
      ),
      valid: (array ?? []).length <= max,
    }),
  });
}
