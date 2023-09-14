import { makeValidator } from "../../src/decorators/decorator.facade";

import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import ErrorMessage from "../../src/messages/model/errors";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";

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
