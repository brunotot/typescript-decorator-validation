import { makeValidator } from "../../src/decorators/decorator.facade";
import { extractGroups } from "../../src/decorators/decorator.utils";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

export default function ArrayOne<K, T extends K[]>(
  props: Decorator.ImpartialProps<{
    test: $.Objects.ArrayPredicate<K>;
  }>
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
