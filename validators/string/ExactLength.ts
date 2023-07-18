import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";
import { $ } from "../../src/types/namespace/Utility.ns";

type ExactLengthType = {
  value: number;
};

export default function ExactLength<T extends $.Nullable<string>>(
  props: DecoratorPartialProps<number, ExactLengthType>
) {
  const exact = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "ExactLength",
      message: extractMessage(props, ErrorMessage.ExactLength(exact)),
      valid: (value ?? "").length === exact,
    }),
  });
}
