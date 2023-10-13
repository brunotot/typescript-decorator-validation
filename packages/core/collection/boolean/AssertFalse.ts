import API from "api";

/** AssertFalse identifier. */
export const ASSERT_FALSE = "AssertFalse";

/** Internal validation function for {@link AssertFalse} validator. */
export function isAssertFalseValid(value: boolean): boolean {
  API.Utilities.Objects.assertType("boolean", value);
  return !value;
}

/**
 * Checks if a boolean value is `false`.
 *
 * @key {@link ASSERT_FALSE AssertFalse}
 * @typeParam T - The type of the decorated property (boolean).
 * @param props - The custom error message or an object with the custom error message and optional arguments.
 * @returns A decorator function to use on class fields of type `boolean`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class State {
 *   _@AssertFalse()
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class State {
 *   _@AssertFalse("You must resolve all errors before continuing")
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class State {
 *   _@AssertFalse({ groups: ["UPDATE"] })
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class State {
 *   _@AssertFalse({ groups: ["UPDATE"], message: "You must resolve all errors before continuing" })
 *   hasErrors: boolean;
 * }
 * ```
 */
export function AssertFalse<T extends boolean>(
  message?: string,
  config?: API.Decorator.Props.Base
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: ASSERT_FALSE,
      valid: !value,
      message: API.Decorator.message(message, locale, ASSERT_FALSE),
    }),
    config
  );
}
