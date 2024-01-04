import API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createClassValidator } from "../../../index";
/** ValidDateRange identifier. */
export const VALID_DATE_RANGE = "ValidDateRange";
/** Internal validation function for {@link ValidDateRange} validator. */
export function isValidDateRangeValid(value, startDateField, endDateField) {
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
export function ValidDateRange(startDateField, endDateField, options) {
    return createClassValidator((value, _context, locale) => ({
        key: API.Decorator.Config.key(options, VALID_DATE_RANGE),
        valid: isValidDateRangeValid(value, startDateField, endDateField),
        message: API.Decorator.Config.message(options, locale, translate(locale, VALID_DATE_RANGE, convertCamelCaseToText(endDateField, false), convertCamelCaseToText(startDateField))),
    }), API.Decorator.Config.groups(options));
}
function convertCamelCaseToText(camelCase, capitalizeFirstLetter = true) {
    if (camelCase === camelCase.toUpperCase()) {
        return camelCase;
    }
    const result = camelCase
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/ (\w)/g, str => str.toLowerCase());
    return capitalizeFirstLetter ? result.replace(/^./, str => str.toUpperCase()) : result;
}
