import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorImpartialProps } from "../../src/decorators/decorator.types";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups } from "../../src/utils/decorator.utils";

export type ArrayNoneType<T> = {
  test: $.Predicate<T>;
};

export default function ArrayNone<K, T extends K[]>(
  props: DecoratorImpartialProps<ArrayNoneType<K>>
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArrayNone",
      message: props.message,
      valid: !(array ?? []).some(props.test),
    }),
  });
}
