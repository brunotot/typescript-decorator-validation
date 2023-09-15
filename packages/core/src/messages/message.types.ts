export type Locale = "hr" | "en" | "de" | "es" | "fr" | "it" | "nl";

export type LocaleDefault = "en";

export type LocalizedMessages = Record<Locale, Messages>;

export type Messages = Record<string, string>;
