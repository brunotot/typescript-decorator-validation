import API from "../../../../index";
/** URL identifier. */
export declare const URL_KEY = "URL";
/** Internal validation function for {@link URL} validator. */
export declare function isURLValid<T extends API.Utilities.Objects.Optional<string>>(value: T): boolean;
/**
 * Checks if decorated string is a valid URL.
 *
 * @key {@link URL_KEY URL}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@URL()
 *   url: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@URL({ message: "Input is not a valid URL" })
 *   url: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@URL({ groups: ["UPDATE"] })
 *   url: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@URL({
 *     message: "Input is not a valid URL",
 *     groups: ["UPDATE"]
 *   })
 *   url: string;
 * }
 * ```
 */
export declare function URL<T extends API.Utilities.Objects.Optional<string>>(options?: API.Decorator.Options): API.Decorator.Service.FieldDecoratorService.Instance<T>;
//# sourceMappingURL=URL.d.ts.map