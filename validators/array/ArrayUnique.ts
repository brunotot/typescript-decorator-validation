import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { hash } from "../../src/utils/object.utils";
import { $ } from "../../src/types/namespace/Utility.ns";
import { isArrayUnique } from "../../src/utils/array.utils";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";
import {
  DecoratorPartialProps,
  DecoratorImpartialProps,
} from "../../src/decorators/types/DecoratorProps.type";

export type ArrayUniqueType<T> = {
  hash?: $.HashGenerator<T>;
};

const DEFAULTS: DecoratorImpartialProps<ArrayUniqueType<any>> = {
  hash,
  groups: [],
  message: ErrorMessage.ArrayUnique(),
};

export default function ArrayUnique<K, T extends K[]>(
  props: DecoratorPartialProps<string, ArrayUniqueType<K>> = DEFAULTS
) {
  const hashFn = typeof props === "string" ? hash : props.hash ?? hash;

  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (array) => ({
      key: "ArrayUnique",
      message: extractMessage(props, ErrorMessage.ArrayUnique()),
      valid: isArrayUnique(
        array ?? [],
        (obj1, obj2) => hashFn(obj1) === hashFn(obj2)
      ),
    }),
  });
}
