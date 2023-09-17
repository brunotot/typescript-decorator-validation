import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";

export default function ValueRange<T extends $.Objects.Optional<number>>(
  props: DecoratorPartialProps<
    {
      min: number;
      max: number;
    },
    {
      min: number;
      max: number;
    }
  >
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
