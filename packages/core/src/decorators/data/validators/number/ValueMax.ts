import { FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization";
import { Objects } from "@utilities";

/** `@ValueMax` key. */
export const VALUE_MAX = "ValueMax";

/** Internal validation function for {@link ValueMax} validator. */
function isValueMaxValid(num: Objects.Optional<number>, max: number): boolean {
  Objects.assertType("number", num);
  return num == null ? true : num <= max;
}

/**
 * Checks if decorated number is not greater than given `max` parameter.
 *
 * @key {@link VALUE_MAX ValueMax}
 * @typeParam T - The type of the number property.
 * @param max - Maximum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueMax(5)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueMax(5, { message: "Maximum allowed value is 5" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueMax(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueMax(5, {
 *     message: "Maximum allowed value is 5",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function ValueMax<T extends Objects.Optional<number>>(
  max: number,
  options?: DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, VALUE_MAX),
      valid: isValueMaxValid(value, max),
      message: buildMessageProp(options, locale, translate(locale, VALUE_MAX, max, value)),
    }),
    buildGroupsProp(options)
  );
}
