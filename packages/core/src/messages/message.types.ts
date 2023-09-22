/**
 * List of supported locales.
 */
export const Locales = ["hr", "en", "de", "es", "fr", "it", "nl"] as const;

/**
 * Type definition for a locale.
 *
 * @remarks
 * This type is derived from the `Locales` constant.
 */
export type Locale = (typeof Locales)[number];

/**
 * Default locale to be used if no locale is specified.
 */
export const LocaleDefault: Locale = "en";

/**
 * Type definition for a collection of locale-specific messages.
 *
 * @remarks
 * The keys are locale codes (e.g., "en", "de"), and the values are `Messages` objects.
 */
export type LocaleMessages = Record<Locale, Messages>;

/**
 * Type definition for a collection of messages.
 *
 * @remarks
 * The keys are message keys (e.g., "hello", "welcome"), and the values are the corresponding localized strings.
 */
export type Messages = Record<string, string>;
