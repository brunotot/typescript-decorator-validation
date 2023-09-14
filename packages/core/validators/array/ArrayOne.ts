import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorImpartialProps } from "../../src/decorators/decorator.types";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups } from "../../src/utils/decorator.utils";

export type ArrayOneType<T> = {
  test: $.Predicate<T>;
};

export default function ArrayOne<K, T extends K[]>(
  props: DecoratorImpartialProps<ArrayOneType<K>>
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArrayOne",
      message: props.message,
      valid: (array ?? []).filter(props.test).length === 1,
    }),
  });
}
