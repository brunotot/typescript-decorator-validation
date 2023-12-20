/**
 * 2-character locale string representation.
 * Supports following locales:
 * - **en**: English
 * - **hr**: Croatian
 * - **de**: German
 * - **es**: Spanish
 * - **fr**: French
 * - **it**: Italian
 * - **nl**: Dutch
 */
export type Locale = "en" | "hr" | "de" | "es" | "fr" | "it" | "nl";

/**
 *  Current global locale setting, defaulted to English (**en**).
 */
let locale: Locale = "en";

/**
 * Retrieves the current global `Locale`.
 */
export function getLocale(): Locale {
  return locale;
}

/**
 * Sets the global `Locale` to the specified value.
 */
export function setLocale(localeValue: Locale): void {
  locale = localeValue;
}
