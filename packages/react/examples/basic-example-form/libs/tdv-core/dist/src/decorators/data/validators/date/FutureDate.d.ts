import { Objects } from "../../../../utilities";
import { FieldDecorator } from "../../../factory/forField";
import { DecoratorOptions } from "../../../helper";
/** `@FutureDate` key. */
export declare const FUTURE_DATE = "FutureDate";
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
export declare function FutureDate<T extends Objects.Optional<Date>>(options?: DecoratorOptions): FieldDecorator<T>;
//# sourceMappingURL=FutureDate.d.ts.map
