import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import { $ } from "../../src/types/namespace/Utility.ns";

type ValueMaxType = {
  value: number;
};

export default function ValueMax<T extends $.Nullable<number>>(
  props: DecoratorPartialProps<number, ValueMaxType>
) {
  const max = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "ValueMax",
      message: extractMessage(props, ErrorMessage.ValueMax(max, value!)),
      valid: value == null ? true : value <= max,
    }),
  });
}
