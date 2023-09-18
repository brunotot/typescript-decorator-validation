import { makeValidator } from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";
import Objects from "../../src/types/namespace/objects.namespace";

const DEFAULTS: Decorator.ImpartialProps<{
  hash?: $.Objects.Hash<any>;
}> = {
  hash: $.Objects.hash,
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
  props: Decorator.PartialProps<
    string,
    {
      hash?: $.Objects.Hash<K>;
    }
  > = DEFAULTS
) {
  const hashFn =
    typeof props === "string" ? $.Objects.hash : props.hash ?? $.Objects.hash;

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
