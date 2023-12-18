import API from "../../index";
import { translate } from "../../src/localization/service/TranslationService";

/** ValidDateRange identifier. */
export const VALID_DATE_RANGE = "ValidDateRange";

/** Internal validation function for {@link ValidDateRange} validator. */
export function isValidDateRangeValid(
  value: any,
  startDateField: string,
  endDateField: string
): boolean {
  API.Utilities.Objects.assertType("object", value);
  return value[startDateField].getTime() < value[endDateField].getTime();
}

/**
 * Checks if {@link Date} `startDateField` is before {@link Date} `endDateField` of a class.
 *
 * @key {@link VALID_DATE_RANGE ValidDateRange}
 * @typeParam T - Class type on which the decorator is put.
 * @param startDateField - Field name for the start {@link Date} property.
 * @param endDateField - Field name for the end {@link Date} property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns An instance of the class decorator.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * \@ValidDateRange("start", "end")
 * class DateForm {
 *   start: Date;
 *   end: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * \@ValidDateRange("start", "end", { message: "Dates are not in a valid range" })
 * class DateForm {
 *   start: Date;
 *   end: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * \@ValidDateRange("start", "end", { groups: ["UPDATE"] })
 * class DateForm {
 *   start: Date;
 *   end: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * \@ValidDateRange("start", "end", { message: "Dates are not in a valid range", groups: ["UPDATE"] })
 * class DateForm {
 *   start: Date;
 *   end: Date;
 * }
 * ```
 */
export function ValidDateRange<T extends API.Decorator.Service.ClassDecoratorService.Type>(
  startDateField: string,
  endDateField: string,
  options?: API.Decorator.Options
): API.Decorator.Service.ClassDecoratorService.Instance<API.Utilities.Types.UnwrapClass<T>> {
  return API.Decorator.Service.ClassDecoratorValidatorService.build(
    (value, _context, locale) => ({
      key: API.Decorator.key(options, VALID_DATE_RANGE),
      valid: isValidDateRangeValid(value, startDateField, endDateField),
      message: API.Decorator.message(
        options,
        locale,
        translate(
          locale,
          VALID_DATE_RANGE,
          API.Utilities.Strings.convertCamelCaseToText(endDateField, false),
          API.Utilities.Strings.convertCamelCaseToText(startDateField)
        )
      ),
    }),
    options
  );
}
