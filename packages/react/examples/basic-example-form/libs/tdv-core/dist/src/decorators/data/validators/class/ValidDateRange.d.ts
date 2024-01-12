import { ClassDecorator } from "../../../factory/forClass";
import { DecoratorOptions } from "../../../helper";
import { Types } from "../../../../utilities";
/** `@ValidDateRange` key. */
export declare const VALID_DATE_RANGE = "ValidDateRange";
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
export declare function ValidDateRange<T extends Types.Class>(startDateField: string, endDateField: string, options?: DecoratorOptions): ClassDecorator<T>;
//# sourceMappingURL=ValidDateRange.d.ts.map