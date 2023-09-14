import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import ErrorMessage from "../../src/messages/model/errors";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractMessage } from "../../src/utils/decorator.utils";

export default function NonPositive<T extends $.Nullable<number>>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    isValid: (num) => ({
      key: "NonPositive",
      message: extractMessage(props, ErrorMessage.NonPositive(num!)),
      valid: num !== undefined && num !== null && num <= 0,
    }),
  });
}
