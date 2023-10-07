import API from "api";

import MessageReaderService from "./MessageReaderService";

/**
 * A service layer which interacts with app's translations
 */
namespace TranslationService {
  /**
   * Localizes a string based on a key and optional arguments.
   *
   * @param key - The key corresponding to the localized string.
   * @param args - Optional values to replace placeholders in the localized string.
   * @returns The localized and formatted string.
   *
   * @example
   * ```typescript
   * const greeting = API.Localization.Service.TranslationService.translate("hello", "Bruno");  // Output might be: "Hello, Bruno!"
   * ```
   *
   * @remarks
   * The function fetches the current locale using `getLocale()` and retrieves the corresponding message from `localeMessages`.
   * It then uses `sprintf` to replace any placeholders in the message with the provided `args`.
   */
  export function translate(
    locale: API.Localization.Resolver.LocaleResolver.Locale | null,
    key: keyof MessageReaderService.LocalizedMessages,
    ...args: any[]
  ) {
    return API.Utilities.Strings.sprintf(
      MessageReaderService.getMessage(key, locale),
      ...args
    );
  }
}

export default TranslationService;
