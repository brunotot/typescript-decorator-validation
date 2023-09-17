import { makeValidator } from "../../src/decorators/decorator.facade";

import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";

type ArraySizeRangeType = {
  min: number;
  max: number;
};

export default function ArraySizeRange<K, T extends K[]>(
  props: DecoratorPartialProps<ArraySizeRangeType, ArraySizeRangeType>
) {
  const min = typeof props === "number" ? props : props.min;
  const max = typeof props === "number" ? props : props.max;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArraySizeRange",
      message: extractMessage(
        props,
        ErrorMessage.ArraySizeRange(min, max, (array ?? []).length)
      ),
      valid: (array ?? []).length >= min && (array ?? []).length <= max,
    }),
  });
}
