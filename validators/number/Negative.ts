import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "../../src/utils/object.utils";

export default function Negative<T extends $.Nullable<number>>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (num) => ({
      key: "Negative",
      message: extractMessage(props, ErrorMessage.Negative(num!)),
      valid: num !== undefined && num !== null && num < 0,
    }),
  });
}
