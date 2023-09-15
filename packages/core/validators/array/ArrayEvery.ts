import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorImpartialProps } from "../../src/decorators/decorator.types";
import { extractGroups } from "../../src/decorators/decorator.utils";
import { $ } from "../../src/types/namespace/Utility.ns";

export type ArrayEveryType<T> = {
  test: $.Predicate<T>;
};

export default function ArrayEvery<K, T extends K[]>(
  props: DecoratorImpartialProps<ArrayEveryType<K>>
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArrayEvery",
      message: props.message,
      valid: (array ?? []).every(props.test),
    }),
  });
}
