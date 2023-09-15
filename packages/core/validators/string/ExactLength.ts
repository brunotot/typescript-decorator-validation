import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/model/errors";
import { $ } from "../../src/types/namespace/Utility.ns";

export default function ExactLength<T extends $.Nullable<string>>(
  props: DecoratorPartialProps<number>
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
