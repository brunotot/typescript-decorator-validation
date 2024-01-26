import { type FieldDecorator } from "../../../factory/forField";
import { type DecoratorOptions } from "../../../helper";
import { type Objects } from "../../../../utilities";
/** Configurable options for `@Password` decorator. */
export type PasswordRules = {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    specials?: boolean;
    length?: number;
};
/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link DecoratorKeys.PASSWORD}
 * @typeParam T - The type of the string property.
 * @param rules - Customizable rules for specific password validations.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Password()
 *   password: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Password(undefined, { message: "Password does not meet the necessary requirements" })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Password(undefined, { groups: ["UPDATE"] })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Password(undefined, { groups: ["UPDATE"], message: "Password does not meet the necessary requirements" })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 5: Supplying custom validation logic while having the error message automatically translated
 * ```ts
 * class Form {
 *   \@Password({ uppercase: true, lowercase: true, })
 *   password: string;
 * }
 * ```
 */
export declare function Password<This, Value extends Objects.Optional<string>>(rules?: PasswordRules, options?: DecoratorOptions<This>): FieldDecorator<This, Value>;
//# sourceMappingURL=Password.d.ts.map