import { FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization";
import { Objects } from "@utilities";

/** `@AssertTrue` key. */
export const ASSERT_TRUE = "AssertTrue";

/** Internal validation function for {@link AssertTrue} validator. */
function isAssertTrueValid(value: boolean): boolean {
  Objects.assertType("boolean", value);
  return !!value;
}

/**
 * Checks if a boolean value is `true`.
 *
 * @key {@link ASSERT_TRUE AssertTrue}
 * @typeParam T - The type of the decorated property (boolean).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `boolean`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Register {
 *   \@AssertTrue()
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Register {
 *   \@AssertTrue({ message: "You must accept our terms of services to continue" })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Register {
 *   \@AssertTrue({ groups: ["UPDATE"] })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Register {
 *   \@AssertTrue({
 *     message: "You must accept our terms of services to continue",
 *     groups: ["UPDATE"]
 *   })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 */
export function AssertTrue<T extends boolean>(options?: DecoratorOptions): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, ASSERT_TRUE),
      valid: isAssertTrueValid(value),
      message: buildMessageProp(options, locale, translate(locale, ASSERT_TRUE)),
    }),
    buildGroupsProp(options)
  );
}
