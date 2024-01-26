import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { testRegex } from "@decorators/data/validators/string/regex/Pattern";
import { RegexConst } from "@decorators/data/validators/string/regex/shared/regex.constants";
import { createFieldValidator, type FieldDecorator } from "@decorators/factory/forField";
import {
  buildDecoratorMeta,
  buildKeyProp,
  buildMessageProp,
  type DecoratorOptions,
} from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link Lowercase} validator. */
function isLowercaseValid<T extends Objects.Optional<string>>(value: T): boolean {
  Objects.assertType("string", value);
  return testRegex(RegexConst.LOWERCASE, value);
}

/**
 * Checks if decorated string contains only lowercase characters.
 *
 * @key {@link DecoratorKeys.LOWERCASE}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Lowercase()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Lowercase({ message: "Input must contain only lowercase characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Lowercase({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Lowercase({
 *     message: "Input must contain only lowercase characters",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Lowercase<This, Value extends Objects.Optional<string>>(
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.LOWERCASE),
      valid: isLowercaseValid(value),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.LOWERCASE)),
    }),
    buildDecoratorMeta(options)
  );
}
