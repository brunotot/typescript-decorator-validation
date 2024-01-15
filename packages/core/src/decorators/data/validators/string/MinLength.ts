import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { createFieldValidator } from "@decorators/factory/forField";
import { type DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link MinLength} validator. */
function isMinLengthValid(value: Objects.Optional<string>, min: number): boolean {
  Objects.assertType("string", value);
  return (value ?? "").length >= min;
}

/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link DecoratorKeys.MIN_LENGTH}
 * @typeParam T - The type of the string property.
 * @param min - Minimum length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@MinLength(5)
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@MinLength(5, { message: "Input must contain at least 5 characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@MinLength(5, { groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@MinLength(5, { groups: ["UPDATE"], message: "Input must contain at least 5 characters" })
 *   input: string;
 * }
 * ```
 */
export function MinLength<T extends Objects.Optional<string>>(min: number, options?: DecoratorOptions) {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.MIN_LENGTH),
      valid: isMinLengthValid(value, min),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.MIN_LENGTH, min)),
    }),
    buildGroupsProp(options)
  );
}
