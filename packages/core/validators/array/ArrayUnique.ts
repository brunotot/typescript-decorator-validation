import { makeValidator } from "../../src/decorators/decorator.facade";
import {
  DecoratorImpartialProps,
  DecoratorPartialProps,
} from "../../src/decorators/decorator.types";
import ErrorMessage from "../../src/messages/model/errors";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";
import { hash } from "../../src/utils/object.utils";

export type ArrayUniqueType<T> = {
  hash?: $.HashGenerator<T>;
};

const DEFAULTS: DecoratorImpartialProps<ArrayUniqueType<any>> = {
  hash,
  groups: [],
  message: ErrorMessage.ArrayUnique(),
};

function isArrayUnique<T>(arr: T[], equals: $.Equals<T>): boolean {
  const set = new Set<T>();
  for (const val of arr) {
    for (const el of set) {
      if (equals(val, el)) {
        return false;
      }
    }
    set.add(val);
  }
  return true;
}

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
