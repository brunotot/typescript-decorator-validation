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
/** Returns the current global {@link Locale `Locale`} value. */
export declare function getGlobalLocale(): Locale;
/** Sets the global {@link Locale `Locale`} to the specified value. */
export declare function setGlobalLocale(localeValue: Locale): void;
//# sourceMappingURL=LocaleResolver.d.ts.map