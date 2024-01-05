import API from "../../../../../index";
import { type FieldDecorator } from "../../../index";
/** PastDate identifier. */
export declare const PAST_DATE = "PastDate";
/** Internal validation function for {@link PastDate} validator. */
export declare function isPastDateValid<T extends API.Utilities.Objects.Optional<Date>>(
  date: T
): boolean;
/**
 * Checks if a {@link Date} is in the past.
 *
 * @key {@link PAST_DATE PastDate}
 * @typeParam T - The type of the date property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@PastDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@PastDate({ message: "Date must be in the past" })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@PastDate({ groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@PastDate({
 *     message: "Date must be in the past",
 *     groups: ["UPDATE"]
 *   })
 *   date: Date;
 * }
 * ```
 */
export declare function PastDate<T extends API.Utilities.Objects.Optional<Date>>(
  options?: API.Decorators.Options
): FieldDecorator<T>;
//# sourceMappingURL=PastDate.d.ts.map
