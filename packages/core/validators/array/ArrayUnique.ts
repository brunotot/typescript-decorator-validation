import Decorator from "../../src/decorators";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ValidatorService from "../../src/decorators/service/validator.service";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";
import Objects from "../../src/types/namespace/objects.namespace";

const DEFAULTS: Decorator.ImpartialProps<{
  hash?: $.Objects.Hash<any>;
}> = {
  hash: $.Objects.hash,
  groups: [],
} as any;

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

/**
 * Decorator for validating that all elements in an array are unique based on a custom comparison function.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.hash - The custom hash function to determine uniqueness (optional). Defaults to using the default hash function.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArrayUnique<string>({ hash: (value) => value.toLowerCase(), message: "Values must be unique ignoring case" })
 *   names: string[];
 * }
 * ```
 * This example validates that all elements in the `names` array are unique when compared using a case-insensitive hash function and provides a custom error message if the validation fails.
 */
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

  return ValidatorService.create<T>({
    groups: extractGroups(props),
    isValid: (array, _, locale) => ({
      key: "ArrayUnique",
      message: extractMessage(
        props,
        TranslationService.translate(locale, "ArrayUnique"),
        locale
      ),
      valid: isArrayUnique(
        array ?? [],
        (obj1, obj2) => hashFn(obj1) === hashFn(obj2)
      ),
    }),
  });
}
