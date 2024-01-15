import { Objects } from "../../../../utilities";
import { FieldDecorator } from "../../../factory/forField";
import { DecoratorOptions } from "../../../helper";
/** `@MaxLength` key. */
export declare const MAX_LENGTH = "MaxLength";
/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link DecoratorKeys.MAX_LENGTH}
 * @typeParam T - The type of the string property.
 * @param max - Maximum length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@MaxLength(5)
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@MaxLength(5, { message: "Input must contain at-most 5 characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@MaxLength(5, { groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@MaxLength(5, { groups: ["UPDATE"], message: "Input must contain at-most 5 characters" })
 *   input: string;
 * }
 * ```
 */
export declare function MaxLength<T extends Objects.Optional<string>>(
  max: number,
  options?: DecoratorOptions
): FieldDecorator<T>;
//# sourceMappingURL=MaxLength.d.ts.map
