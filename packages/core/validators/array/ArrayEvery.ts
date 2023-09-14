import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorImpartialProps } from "../../src/decorators/decorator.types";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups } from "../../src/utils/decorator.utils";

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
