import { makeValidator } from "../../src/decorators/decorator.facade";

import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";

type ArraySizeExactType = {
  value: number;
};

export default function ArraySizeExact<K, T extends K[]>(
  props: DecoratorPartialProps<number, ArraySizeExactType>
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
