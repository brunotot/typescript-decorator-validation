import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import { extractMessage } from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import { $ } from "../../src/types/namespace/Utility.ns";

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
