import API from "api";

/** AssertTrue identifier. */
export const ASSERT_TRUE = "AssertTrue";

/** Internal validation function for {@link AssertTrue} validator. */
export function isAssertTrueValid(value: boolean): boolean {
  API.Utilities.Objects.assertType("boolean", value);
  return !value;
}

/**
 * Checks if a boolean value is `true`.
 *
 * @key {@link ASSERT_TRUE AssertTrue}
 * @typeParam T - The type of the decorated property (boolean).
 * @param props - The custom error message or an object with the custom error message and optional arguments.
 * @returns A decorator function to use on class fields of type `boolean`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Register {
 *   _@AssertTrue()
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Register {
 *   _@AssertTrue("You must accept our terms of services to continue")
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Register {
 *   _@AssertTrue(undefined, { groups: ["UPDATE"] })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Register {
 *   _@AssertTrue(
 *     "You must accept our terms of services to continue",
 *     { groups: ["UPDATE"] }
 *   )
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 */
export function AssertTrue<T extends boolean>(
  message?: string,
  config?: API.Decorator.Props.Base
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: ASSERT_TRUE,
      valid: !!value,
      message: API.Decorator.message(message, locale, ASSERT_TRUE),
    }),
    config
  );
}
