import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import { $ } from "../../src/types/namespace/Utility.ns";

export default function MaxLength<T extends $.Nullable<string>>(
  props: DecoratorPartialProps<number>
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
