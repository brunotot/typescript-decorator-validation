import API from "api";

/** ArrayContains identifier. */
export const ARRAY_CONTAINS = "ArrayContains";

/** Internal validation function for {@link ArrayContains} validator. */
export function isArrayContainsValid<K, T extends K[]>(
  value: T,
  contains: K
): boolean {
  API.Utilities.Objects.assertType("array", value);
  return (value ?? []).includes(contains);
}

/**
 * Checks if the decorated array contains a specific value.
 *
 * @key {@link ARRAY_CONTAINS ArrayContains}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param props - The search item of type `K` or an object with the search item and optional arguments.
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   _@ArrayContains("en")
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   _@ArrayContains({ value: "en", message: "English language must be selected" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   _@ArrayContains({ value: "en", groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   _@ArrayContains({ value: "en", groups: ["UPDATE"], message: "English language must be selected" })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayContains<K, T extends Array<K>>(
  props: API.Decorator.Props.MultiArgsMessageOptional<K>
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  const contains = API.Decorator.args(props);
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (array, _context, locale) => ({
      key: ARRAY_CONTAINS,
      message: API.Decorator.message(props, locale, ARRAY_CONTAINS, contains),
      valid: isArrayContainsValid(array, contains),
    }),
  });
}
