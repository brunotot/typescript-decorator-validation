import { getMessage } from "../service/MessageReaderService";
/**
 * Formats a string by replacing placeholders with provided arguments.
 * @param str - The string containing placeholders in the form of `{0}`, `{1}`, etc.
 * @param args - The values to replace the placeholders with.
 * @returns The formatted string with placeholders replaced by the corresponding values from `args`.
 * @remarks If a placeholder's corresponding value is not provided in `args`, the placeholder will remain unchanged in the output string.
 * @example
 * 1: Basic usage
 * ```ts
 * const formatted = sprintf("Hello, {0}!", "World");  // Output: "Hello, World!"
 * ```
 */
function sprintf(str, ...args) {
    return str.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== "undefined" ? args[number] : match;
    });
}
/**
 * Localizes a string based on a corresponding key and optional arguments mapped by indices. (ex: `"Hello {0}! How are you?"`)
 *
 * @param key - The key corresponding to the localized string. (ex: `"Hello"`)
 * @param args - Optional values to replace template placeholders in the localized string. (ex: `["John Doe"]`)
 * @remarks This translation mechanism utilizes {@link sprintf} function for replacing template placeholders with the provided `args`.
 * @returns The localized and formatted message by `key` and `args` params.
 *
 * @example
 * 1: Basic usage (locale is evaluated by `LocaleResolver.getLocale()` which defaults to `"en"`)
 * ```typescript
 * const greeting = translate(null, "Hello");  // "Hello {0}! How are you?"
 * ```
 *
 * @example
 * 2: Supplying a custom locale
 * ```typescript
 * const greeting = translate("es", "Hello");  // "¡Hola {0}! ¿Cómo estás?"
 * ```
 *
 * @example
 * 3: Supplying template arguments
 * ```typescript
 * const greeting = translate("en", "Hello", "John Doe");  // "Hello John Doe! How are you?"
 * ```
 */
export function translate(locale, DecoratorKeys.key, ...args) {
    const message = getMessage(key, locale);
    const translatedMessage = sprintf(message, ...args);
    return translatedMessage;
}
