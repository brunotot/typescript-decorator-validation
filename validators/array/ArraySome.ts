import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { extractGroups } from "../../src/utils/object.utils";
import { DecoratorImpartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { $ } from "../../src/types/namespace/Utility.ns";

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
