import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { extractGroups } from "../../src/utils/object.utils";
import { DecoratorImpartialProps } from "../../src/decorators/types/DecoratorProps.type";
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
