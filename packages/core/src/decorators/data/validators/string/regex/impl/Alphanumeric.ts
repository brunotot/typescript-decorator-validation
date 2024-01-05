import * as API from "../../../../../../../index";
import { createFieldValidator, type FieldDecorator } from "../../../../../../decorators";
import { translate } from "../../../../../../localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";

/** `@Alphanumeric` key. */
export const ALPHANUMERIC = "Alphanumeric";

/** Internal validation function for {@link Alphanumeric} validator. */
function isAlphanumericValid<T extends API.Utilities.Objects.Optional<string>>(value: T): boolean {
  API.Utilities.Objects.assertType("string", value);
  return testRegex(RegexConst.ALPHANUMERIC, value);
}

/**
 * Checks if decorated string contains only alphabetical or number characters.
 *
 * @key {@link ALPHANUMERIC Alphanumeric}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Alphanumeric()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Alphanumeric({ message: "Input must contain only alphabetical or number characters (no specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Alphanumeric({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Alphanumeric({
 *     message: "Input must contain only alphabetical or number characters (no specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Alphanumeric<T extends API.Utilities.Objects.Optional<string>>(
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, ALPHANUMERIC),
      valid: testRegex(RegexConst.ALPHANUMERIC, value),
      message: API.Decorators.buildMessageProp(options, locale, translate(locale, ALPHANUMERIC)),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}
