"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidDateRange = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forClass_1 = require("../../../factory/forClass");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link ValidDateRange} validator. */
function isValidDateRangeValid(value, startDateField, endDateField) {
    _utilities_1.Objects.assertType("object", value);
    return value[startDateField].getTime() < value[endDateField].getTime();
}
/**
 * Checks if {@link Date} `startDateField` is before {@link Date} `endDateField` of a class.
 *
 * @key {@link DecoratorKeys.VALID_DATE_RANGE}
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
function ValidDateRange(startDateField, endDateField, options) {
    return (0, forClass_1.createClassValidator)((value, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.VALID_DATE_RANGE),
        valid: isValidDateRangeValid(value, startDateField, endDateField),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.VALID_DATE_RANGE, convertCamelCaseToText(endDateField, false), convertCamelCaseToText(startDateField))),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.ValidDateRange = ValidDateRange;
function convertCamelCaseToText(camelCase, capitalizeFirstLetter = true) {
    if (camelCase === camelCase.toUpperCase()) {
        return camelCase;
    }
    const result = camelCase.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/ (\w)/g, str => str.toLowerCase());
    return capitalizeFirstLetter ? result.replace(/^./, str => str.toUpperCase()) : result;
}
