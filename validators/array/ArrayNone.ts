import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { extractGroups } from "../../src/utils/object.utils";
import { DecoratorImpartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { $ } from "../../src/types/namespace/Utility.ns";

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
