import { Locale, LocaleDefault } from "../message.types";

/**
 * Current locale setting.
 *
 * @remarks
 * Initialized to the default locale specified in `LocaleDefault`.
 */
let locale: Locale = LocaleDefault;

/**
 * Retrieves the current locale setting.
 *
 * @returns The current `Locale`.
 *
 * @example
 * ```typescript
 * const currentLocale = getLocale();  // Might return: "en"
 * ```
 */
function getLocale(): Locale {
  return locale;
}

/**
 * Sets the current locale setting.
 *
 * @param localeValue - The `Locale` to set as the current locale.
 *
 * @example
 * ```typescript
 * setLocale("de");  // Sets the current locale to German ("de").
 * ```
 */
function setLocale(localeValue: Locale) {
  locale = localeValue;
}

export { getLocale, setLocale };
