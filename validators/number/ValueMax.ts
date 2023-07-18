import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";

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
