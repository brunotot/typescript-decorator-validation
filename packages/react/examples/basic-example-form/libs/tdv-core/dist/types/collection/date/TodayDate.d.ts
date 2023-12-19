import API from "../../index";
/** TodayDate identifier. */
export declare const TODAY_DATE = "TodayDate";
/** Internal validation function for {@link TodayDate} validator. */
export declare function isTodayDateValid<T extends API.Utilities.Objects.Optional<Date>>(date: T): boolean;
/**
 * Checks if a {@link Date} is the today's date based on year, month and day.
 *
 * @key {@link TODAY_DATE TodayDate}
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
export declare function TodayDate<T extends API.Utilities.Objects.Optional<Date>>(options?: API.Decorator.Options): API.Decorator.Service.FieldDecoratorService.Instance<T>;
//# sourceMappingURL=TodayDate.d.ts.map