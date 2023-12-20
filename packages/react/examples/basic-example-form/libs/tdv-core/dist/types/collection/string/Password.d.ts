import API from "../../index";
/** Password identifier. */
export declare const PASSWORD = "Password";
export type PasswordRules = {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    specials?: boolean;
    length?: number;
};
/** Internal validation function for {@link Password} validator. */
export declare function isPasswordValid(input: API.Utilities.Objects.Optional<string>, rules: PasswordRules | undefined, definedMessage?: string, locale?: API.Localization.LocaleResolver.Locale): {
    key: string;
    message: string;
    valid: boolean;
};
/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link PASSWORD Password}
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
export declare function Password<T extends API.Utilities.Objects.Optional<string>>(rules?: PasswordRules, options?: API.Decorator.Config.Options): (target: any, context: Readonly<{
    kind: "getter" | "method" | "field";
    static: boolean;
    private: boolean;
    name: string;
    metadata: DecoratorMetadataObject;
    access: {
        get: (object: any) => T;
    };
}>) => void;
//# sourceMappingURL=Password.d.ts.map