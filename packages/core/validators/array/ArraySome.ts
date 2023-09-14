import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorImpartialProps } from "../../src/decorators/decorator.types";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups } from "../../src/utils/decorator.utils";

export type ArraySomeType<T> = {
  test: $.Predicate<T>;
};

export default function ArraySome<K, T extends K[]>(
  props: DecoratorImpartialProps<ArraySomeType<K>>
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArraySome",
      message: props.message,
      valid: (array ?? []).some(props.test),
    }),
  });
}
