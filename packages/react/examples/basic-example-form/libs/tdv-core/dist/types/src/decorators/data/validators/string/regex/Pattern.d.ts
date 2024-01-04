import API from "../../../../../../index";
export declare function testRegex<T extends API.Utilities.Objects.Optional<string>>(regex: RegExp, value: T): boolean;
/**
 * Creates a validator decorator that checks if a string value matches a regular expression pattern.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param regex The regular expression pattern to match against the value.
 * @param message - (Optional) The custom error message to display when validation fails.
 * @param key - (Optional) The key to identify this validation rule in error messages. Defaults to "Pattern".
 * @param config - (Optional) An array of validation groups to which this rule belongs.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class MyClass {
 *   @Pattern({ regex: /^[0-9]+$/ })
 *   myProperty: string;
 * }
 *
 * // Example 2: Custom error message and validation groups
 * class AnotherClass {
 *   @Pattern({
 *     regex: /^[A-Za-z]+$/,
 *     key: "AlphabeticPattern",
 *     message: "Must contain only alphabetic characters",
 *     groups: ["registration", "profile"],
 *   })
 *   anotherProperty: string;
 * }
 */
export declare function Pattern<T extends API.Utilities.Objects.Optional<string>>(regex: RegExp, options?: API.Decorator.Config.Options): API.Decorator.FieldDecorator<T>;
//# sourceMappingURL=Pattern.d.ts.map