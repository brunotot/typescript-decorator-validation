namespace Localization {
  export type Locale = "en" | "hr" | "de" | "es" | "fr" | "it" | "nl";

  export const FALLBACK_LOCALE: Locale = "en";

  /**
   * Type definition for a collection of locale-specific messages.
   *
   * @remarks
   * The keys are locale codes (e.g. "en", "de"...), and the values are objects
   * in which the key represents a translation identifier while the value
   * corresponds to the identifier's localized string.
   */
  export type Messages = Record<Locale, Record<string, string>>;
}

export default Localization;
