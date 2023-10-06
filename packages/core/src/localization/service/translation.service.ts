import API from "api";

import * as de from "../translations/de.json";
import * as en from "../translations/en.json";
import * as es from "../translations/es.json";
import * as fr from "../translations/fr.json";
import * as hr from "../translations/hr.json";
import * as it from "../translations/it.json";
import * as nl from "../translations/nl.json";

const localeMessages: API.Localization.Messages = {
  hr,
  de,
  en,
  es,
  fr,
  it,
  nl,
};

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
   * const greeting = API.Localization.TranslationService.translate("hello", "Bruno");  // Output might be: "Hello, Bruno!"
   * ```
   *
   * @remarks
   * The function fetches the current locale using `getLocale()` and retrieves the corresponding message from `localeMessages`.
   * It then uses `sprintf` to replace any placeholders in the message with the provided `args`.
   */
  export function translate(
    locale: API.Localization.Locale | null,
    key: string,
    ...args: any[]
  ) {
    const service = localeMessages[locale ?? API.Localization.getLocale()];
    return API.Utilities.Strings.sprintf(service[key], ...args);
  }
}

export default TranslationService;
