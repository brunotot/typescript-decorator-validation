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

let locale: Locale = "en";

/** Returns the current global {@link Locale `Locale`} value. */
export function getGlobalLocale(): Locale {
  return locale;
}

/** Sets the global {@link Locale `Locale`} to the specified value. */
export function setGlobalLocale(localeValue: Locale): void {
  locale = localeValue;
}
