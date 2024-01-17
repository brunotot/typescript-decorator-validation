"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FutureDate = void 0;
const DecoratorKeys_1 = require("../../../data/validators/DecoratorKeys");
const forField_1 = require("../../../factory/forField");
const helper_1 = require("../../../helper");
const TranslationService_1 = require("../../../../localization/service/TranslationService");
const _utilities_1 = require("../../../../utilities");
/** Internal validation function for {@link FutureDate} validator. */
function isFutureDateValid(date) {
    _utilities_1.Objects.assertType("date", date);
    return date && date.getTime() > new Date().getTime();
}
/**
 * Checks if a {@link Date} is in the future.
 *
 * @key {@link DecoratorKeys.FUTURE_DATE}
 * @typeParam T - The type of the date property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@FutureDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@FutureDate({ message: "Date must be in the future" })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@FutureDate({ groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@FutureDate({
 *     message: "Date must be in the future",
 *     groups: ["UPDATE"]
 *   })
 *   date: Date;
 * }
 * ```
 */
function FutureDate(options) {
    return (0, forField_1.createFieldValidator)((date, _context, locale) => ({
        key: (0, helper_1.buildKeyProp)(options, DecoratorKeys_1.DecoratorKeys.FUTURE_DATE),
        valid: isFutureDateValid(date),
        message: (0, helper_1.buildMessageProp)(options, locale, (0, TranslationService_1.translate)(locale, DecoratorKeys_1.DecoratorKeys.FUTURE_DATE, date)),
    }), (0, helper_1.buildGroupsProp)(options));
}
exports.FutureDate = FutureDate;
