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
 * Retrieves the current global `Locale`.
 */
export declare function getLocale(): Locale;
/**
 * Sets the global `Locale` to the specified value.
 */
export declare function setLocale(localeValue: Locale): void;
//# sourceMappingURL=LocaleResolver.d.ts.map