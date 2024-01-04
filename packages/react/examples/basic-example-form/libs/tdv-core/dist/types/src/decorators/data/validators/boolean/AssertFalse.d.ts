import API from "../../../../../index";
import { FieldDecorator } from "../../../index";
/** AssertFalse identifier. */
export declare const ASSERT_FALSE = "AssertFalse";
/** Internal validation function for {@link AssertFalse} validator. */
export declare function isAssertFalseValid(value: boolean): boolean;
/**
 * Checks if a boolean value is `false`.
 *
 * @key {@link ASSERT_FALSE AssertFalse}
 * @typeParam T - The type of the decorated property (boolean).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `boolean`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class State {
 *   \@AssertFalse()
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class State {
 *   \@AssertFalse({ message: "You must resolve all errors before continuing" })
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class State {
 *   \@AssertFalse({ groups: ["UPDATE"] })
 *   hasErrors: boolean;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class State {
 *   \@AssertFalse({
 *     message: "You must resolve all errors before continuing",
 *     groups: ["UPDATE"]
 *   })
 *   hasErrors: boolean;
 * }
 * ```
 */
export declare function AssertFalse<T extends boolean>(options?: API.Decorator.Config.Options): FieldDecorator<T>;
//# sourceMappingURL=AssertFalse.d.ts.map