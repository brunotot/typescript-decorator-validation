import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { extractGroups } from "../../src/utils/object.utils";
import { DecoratorImpartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { $ } from "../../src/types/namespace/Utility.ns";

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
