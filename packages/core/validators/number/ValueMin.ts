import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import { $ } from "../../src/types/namespace/Utility.ns";

type ValueMinType = {
  value: number;
};

export default function ValueMin<T extends $.Nullable<number>>(
  props: DecoratorPartialProps<number, ValueMinType>
) {
  const min = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "ValueMin",
      message: extractMessage(props, ErrorMessage.ValueMin(min, value!)),
      valid: value == null ? true : value >= min,
    }),
  });
}
