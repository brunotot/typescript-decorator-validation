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

/** Internal validation function for {@link IPAddress} validator. */
function isIPAddressValid<T extends Objects.Optional<string>>(value: T): boolean {
  Objects.assertType("string", value);
  return testRegex(RegexConst.IP_ADDRESS, value);
}

/**
 * Checks if decorated string is a valid IP address.
 *
 * @key {@link DecoratorKeys.IP_ADDRESS}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@IPAddress()
 *   ipAddress: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@IPAddress({ message: "Input is not a valid IP address" })
 *   ipAddress: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@IPAddress({ groups: ["UPDATE"] })
 *   ipAddress: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@IPAddress({
 *     message: "Input is not a valid IP address",
 *     groups: ["UPDATE"]
 *   })
 *   ipAddress: string;
 * }
 * ```
 */
export function IPAddress<This, Value extends Objects.Optional<string>>(
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.IP_ADDRESS),
      valid: isIPAddressValid(value),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.IP_ADDRESS)),
    }),
    buildDecoratorMeta(options)
  );
}
