import { FieldDecorator } from "../../../factory/forField";
import { DecoratorOptions } from "../../../helper";
/** `@AssertTrue` key. */
export declare const ASSERT_TRUE = "AssertTrue";
/**
 * Checks if a boolean value is `true`.
 *
 * @key {@link ASSERT_TRUE AssertTrue}
 * @typeParam T - The type of the decorated property (boolean).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `boolean`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Register {
 *   \@AssertTrue()
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Register {
 *   \@AssertTrue({ message: "You must accept our terms of services to continue" })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Register {
 *   \@AssertTrue({ groups: ["UPDATE"] })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Register {
 *   \@AssertTrue({
 *     message: "You must accept our terms of services to continue",
 *     groups: ["UPDATE"]
 *   })
 *   acceptsTermsOfService: boolean;
 * }
 * ```
 */
export declare function AssertTrue<T extends boolean>(options?: DecoratorOptions): FieldDecorator<T>;
//# sourceMappingURL=AssertTrue.d.ts.map