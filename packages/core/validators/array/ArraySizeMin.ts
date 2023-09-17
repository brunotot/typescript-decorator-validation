import { makeValidator } from "../../src/decorators/decorator.facade";

import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";

type ArraySizeMinType = {
  value: number;
};

export default function ArraySizeMin<K, T extends K[]>(
  props: DecoratorPartialProps<number, ArraySizeMinType>
) {
  const min = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArraySizeMin",
      message: extractMessage(
        props,
        ErrorMessage.ArraySizeMin(min, (array ?? []).length)
      ),
      valid: (array ?? []).length >= min,
    }),
  });
}
