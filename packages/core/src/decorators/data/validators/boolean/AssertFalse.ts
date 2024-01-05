import * as API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createFieldValidator, type FieldDecorator } from "../../../index";

/** `@AssertFalse` key. */
export const ASSERT_FALSE = "AssertFalse";

/** Internal validation function for {@link AssertFalse} validator. */
function isAssertFalseValid(value: boolean): boolean {
  API.Utilities.Objects.assertType("boolean", value);
  return !value;
}

/**
 * Checks if a boolean value is `false`.
 *
 * @key {@link ASSERT_FALSE AssertFalse}
 * @typeParam T - The type of the decorated property (boolean).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `boolean`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class State {
 *   \@AssertFalse()
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class State {
 *   \@AssertFalse({ message: "You must resolve all errors before continuing" })
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class State {
 *   \@AssertFalse({ groups: ["UPDATE"] })
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class State {
 *   \@AssertFalse({
 *     message: "You must resolve all errors before continuing",
 *     groups: ["UPDATE"]
 *   })
 *   hasErrors: boolean;
 * }
 * ```
 */
export function AssertFalse<T extends boolean>(
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, ASSERT_FALSE),
      valid: isAssertFalseValid(value),
      message: API.Decorators.buildMessageProp(options, locale, translate(locale, ASSERT_FALSE)),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}
