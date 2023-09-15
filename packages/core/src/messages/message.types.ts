export const Locales = ["hr", "en", "de", "es", "fr", "it", "nl"] as const;

export type Locale = (typeof Locales)[number];

export const LocaleDefault: Locale = "en";

export type LocaleMessages = Record<Locale, Messages>;

export type Messages = Record<string, string>;
