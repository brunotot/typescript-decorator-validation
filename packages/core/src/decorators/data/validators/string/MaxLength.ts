import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { createFieldValidator, type FieldDecorator } from "@decorators/factory/forField";
import {
  buildDecoratorMeta,
  buildKeyProp,
  buildMessageProp,
  type DecoratorOptions,
} from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link MaxLength} validator. */
function isMaxLengthValid(value: Objects.Optional<string>, max: number): boolean {
  Objects.assertType("string", value);
  return (value ?? "").length <= max;
}

/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link DecoratorKeys.MAX_LENGTH}
 * @typeParam T - The type of the string property.
 * @param max - Maximum length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@MaxLength(5)
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@MaxLength(5, { message: "Input must contain at-most 5 characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@MaxLength(5, { groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@MaxLength(5, { groups: ["UPDATE"], message: "Input must contain at-most 5 characters" })
 *   input: string;
 * }
 * ```
 */
export function MaxLength<This, Value extends Objects.Optional<string>>(
  max: number,
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.MAX_LENGTH),
      valid: isMaxLengthValid(value, max),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.MAX_LENGTH, max)),
    }),
    buildDecoratorMeta(options)
  );
}
