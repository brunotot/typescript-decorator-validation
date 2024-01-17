"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodayDate = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link TodayDate} validator. */
function isTodayDateValid(date) {
    _utilities_1.Objects.assertType("date", date);
    const currentDate = new Date();
    return (date &&
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear());
}
/**
 * Checks if a {@link Date} is the today's date based on year, month and day.
 *
 * @key {@link DecoratorKeys.TODAY_DATE}
 * @typeParam T - The type of the date property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@TodayDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@TodayDate({ message: "The date must be today" })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@TodayDate({ groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@TodayDate({
 *     message: "The date must be today",
 *     groups: ["UPDATE"]
 *   })
 *   date: Date;
 * }
 * ```
 */
function TodayDate(options) {
    return (0, forField_1.createFieldValidator)((date, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.TODAY_DATE),
        valid: isTodayDateValid(date),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.TODAY_DATE, date)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.TodayDate = TodayDate;
