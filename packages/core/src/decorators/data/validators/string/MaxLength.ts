import * as API from "../../../../../index";
import { createFieldValidator, type FieldDecorator } from "../../../../decorators";
import { translate } from "../../../../localization/service/TranslationService";

/** `@MaxLength` key. */
export const MAX_LENGTH = "MaxLength";

/** Internal validation function for {@link MaxLength} validator. */
function isMaxLengthValid(value: API.Utilities.Objects.Optional<string>, max: number): boolean {
  API.Utilities.Objects.assertType("string", value);
  return (value ?? "").length <= max;
}

/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link MAX_LENGTH MaxLength}
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
export function MaxLength<T extends API.Utilities.Objects.Optional<string>>(
  max: number,
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, MAX_LENGTH),
      valid: isMaxLengthValid(value, max),
      message: API.Decorators.buildMessageProp(options, locale, translate(locale, MAX_LENGTH, max)),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}
