import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import ErrorMessage from "../../src/messages/model/errors";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";

export type ValueRangeProps = {
  min: number;
  max: number;
};

export default function ValueRange<T extends $.Nullable<number>>(
  props: DecoratorPartialProps<ValueRangeProps, ValueRangeProps>
) {
  const { min, max } = props;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "ValueRange",
      message: extractMessage(props, ErrorMessage.ValueRange(min, max, value!)),
      valid: value == null ? true : value >= min && value <= max,
    }),
  });
}
