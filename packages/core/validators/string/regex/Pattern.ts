import { makeValidator } from "../../../src/decorators/decorator.facade";
import { extractGroups } from "../../../src/decorators/decorator.utils";
import $ from "../../../src/types";
import Decorator from "../../../src/types/namespace/decorator.namespace";

export default function Pattern<T extends $.Objects.Optional<string>>(
  props: Decorator.ImpartialProps<{
    regex: RegExp;
    key?: string;
  }>
) {
  return makeValidator<T>({
    groups: extractGroups(props.groups),
    isValid: (value) => ({
      key: props.key ?? "Pattern",
      message: props.message,
      valid: (value ?? "").length === 0 || props.regex.test(value!),
    }),
  });
}
