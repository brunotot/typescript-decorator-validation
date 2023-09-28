import Localization from "..";
import * as de from "../translations/de.json";
import * as en from "../translations/en.json";
import * as es from "../translations/es.json";
import * as fr from "../translations/fr.json";
import * as hr from "../translations/hr.json";
import * as it from "../translations/it.json";
import * as nl from "../translations/nl.json";

const localeMessages: Localization.Messages = { hr, de, en, es, fr, it, nl };

/**
 * Formats a string by replacing placeholders with provided arguments.
 *
 * @param str - The string containing placeholders in the form of `{0}`, `{1}`, etc.
 * @param args - The values to replace the placeholders with.
 * @returns The formatted string with placeholders replaced by the corresponding values from `args`.
 *
 * @example
 * ```typescript
 * const formatted = sprintf("Hello, {0}!", "World");  // Output: "Hello, World!"
 * ```
 *
 * @remarks
 * If a placeholder's corresponding value is not provided in `args`, the placeholder will remain unchanged in the output string.
 */
function sprintf(str: string, ...args: any[]) {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}

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
   * const greeting = TranslationService.translate("hello", "Bruno");  // Output might be: "Hello, Bruno!"
   * ```
   *
   * @remarks
   * The function fetches the current locale using `getLocale()` and retrieves the corresponding message from `localeMessages`.
   * It then uses `sprintf` to replace any placeholders in the message with the provided `args`.
   */
  export function translate(
    locale: Localization.Locale | null,
    key: string,
    ...args: any[]
  ) {
    const service = localeMessages[locale ?? Localization.getLocale()];
    return sprintf(service[key], ...args);
  }
}

export default TranslationService;
