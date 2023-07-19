import { makeValidator } from "../../../src/decorators/facade/validator.facade";
import { DecoratorImpartialProps } from "../../../src/decorators/types/DecoratorProps.type";
import { extractGroups } from "../../../src/utils/decorator.utils";
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
