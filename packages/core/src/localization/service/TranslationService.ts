import API from "api";

import MessageReaderService from "./MessageReaderService";

/**
 * Localizes a string based on a corresponding key and optional arguments mapped by indices. (ex: `"Hello {0}! How are you?"`)
 *
 * @param key - The key corresponding to the localized string. (ex: `"Hello"`)
 * @param args - Optional values to replace template placeholders in the localized string. (ex: `["John Doe"]`)
 * @remarks This translation mechanism utilizes {@link API.Utilities.Strings.sprintf sprintf} function for replacing template placeholders with the provided `args`.
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
export function translate(
  locale: API.Localization.Resolver.LocaleResolver.Locale | null,
  key: keyof MessageReaderService.LocalizedMessages,
  ...args: any[]
): string {
  return API.Utilities.Strings.sprintf(
    MessageReaderService.getMessage(key, locale),
    ...args
  );
}
