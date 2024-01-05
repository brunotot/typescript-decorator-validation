import * as API from "../../../../../index";
import { createFieldValidator, type FieldDecorator } from "../../../../decorators";
import { translate } from "../../../../localization/service/TranslationService";

/** `@ValueRange` key. */
export const VALUE_RANGE = "ValueRange";

/** Internal validation function for {@link ValueRange} validator. */
function isValueRangeValid(
  num: API.Utilities.Objects.Optional<number>,
  min: number,
  max: number
): boolean {
  API.Utilities.Objects.assertType("number", num);
  return num == null ? true : num >= min && num <= max;
}

/**
 * Checks if decorated number is within a given range of `min` and `max` parameters.
 *
 * @key {@link VALUE_RANGE ValueRange}
 * @typeParam T - The type of the number property.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueRange(5, 10)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueRange(5, 10, { message: "Number must be greater than 4 and less than 11" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueRange(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueRange(5, 10, {
 *     message: "Number must be greater than 4 and less than 11",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function ValueRange<T extends API.Utilities.Objects.Optional<number>>(
  min: number,
  max: number,
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (num, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, VALUE_RANGE),
      valid: isValueRangeValid(num, min, max),
      message: API.Decorators.buildMessageProp(
        options,
        locale,
        translate(locale, VALUE_RANGE, min, max, num)
      ),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}