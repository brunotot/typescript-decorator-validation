import { makeValidator } from "../../../src/decorators/decorator.facade";
import { DecoratorImpartialProps } from "../../../src/decorators/decorator.types";
import { extractGroups } from "../../../src/decorators/decorator.utils";
import { $ } from "../../../src/types/namespace/Utility.ns";

export type PatternType = {
  regex: RegExp;
  key?: string;
};

export default function Pattern<T extends $.Nullable<string>>(
  props: DecoratorImpartialProps<PatternType>
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
