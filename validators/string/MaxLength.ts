import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";
import { $ } from "../../src/types/namespace/Utility.ns";

type MaxLengthType = {
  value: number;
};

export default function MaxLength<T extends $.Nullable<string>>(
  props: DecoratorPartialProps<number, MaxLengthType>
) {
  const max = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "MaxLength",
      message: extractMessage(props, ErrorMessage.MaxLength(max)),
      valid: (value ?? "").length <= max,
    }),
  });
}
