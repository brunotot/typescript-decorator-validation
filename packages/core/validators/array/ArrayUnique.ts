import { makeValidator } from "../../src/decorators/decorator.facade";
import {
  DecoratorImpartialProps,
  DecoratorPartialProps,
} from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import { hash } from "../../src/shared";
import $ from "../../src/types";
import Objects from "../../src/types/namespace/objects.namespace";

const DEFAULTS: DecoratorImpartialProps<{
  hash?: $.Objects.Hash<any>;
}> = {
  hash,
  groups: [],
  message: ErrorMessage.ArrayUnique(),
};

function isArrayUnique<T>(arr: T[], equals: Objects.Equals<T>): boolean {
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
  props: DecoratorPartialProps<
    string,
    {
      hash?: $.Objects.Hash<K>;
    }
  > = DEFAULTS
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
