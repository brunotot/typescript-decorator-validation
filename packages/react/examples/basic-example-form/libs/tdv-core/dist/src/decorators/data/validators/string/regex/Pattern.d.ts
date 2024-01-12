import { DecoratorOptions } from "../../../../helper";
import { Objects } from "../../../../../utilities";
/**
 * Tests if a value matches a regular expression pattern.
 * @template T - The type of the value being tested.
 * @param regex - The regular expression pattern to test against.
 * @param value - The value to test.
 * @returns A boolean indicating whether the value matches the pattern.
 */
export declare function testRegex<T extends Objects.Optional<string>>(regex: RegExp, value: T): boolean;
/**
 * Creates a validator decorator that checks if a string value matches a regular expression pattern.
 * @typeparam T - The type of the decorated property (optional string).
 * @param regex The regular expression pattern to match against the value.
 * @param message - (Optional) The custom error message to display when validation fails.
 * @param key - (Optional) The key to identify this validation rule in error messages. Defaults to "Pattern".
 * @param config - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 * @example
 * 1: Basic usage with default options
 * ```ts
 * class MyClass {
 *   \@Pattern(/^[A-Za-z]+$/)
 *   lettersOnly: string;
 * }
 * ```
 * @example
 * 2: Custom error message and validation groups
 * ```ts
 * class MyClass {
 *   \@Pattern(/^[A-Za-z]+$/, {
 *     key: "AlphabeticPattern",
 *     message: "Must contain only alphabetic characters",
 *     groups: ["group1", "group2"],
 *   })
 *   lettersOnly: string;
 * }
 * ```
 */
export declare function Pattern<T extends Objects.Optional<string>>(regex: RegExp, options?: DecoratorOptions): import("../../../../factory/forField").FieldDecorator<T>;
//# sourceMappingURL=Pattern.d.ts.map