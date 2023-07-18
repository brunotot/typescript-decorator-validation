import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "../../src/utils/object.utils";

type MinLengthType = {
  value: number;
};

export default function MinLength<T extends $.Nullable<string>>(
  props: DecoratorPartialProps<number, MinLengthType>
) {
  const min = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "MinLength",
      message: extractMessage(props, ErrorMessage.MinLength(min)),
      valid: (value ?? "").length >= min,
    }),
  });
}
