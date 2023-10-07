/**
 * A configuration class which allows for setting the global `Locale`.
 */
namespace LocaleResolver {
  /**
   * 2-character locale string representation
   */
  export type Locale = "en" | "hr" | "de" | "es" | "fr" | "it" | "nl";

  let locale: Locale = "en";

  /**
   * Function which returns current global `Locale` value.
   */
  export function getLocale(): Locale {
    return locale;
  }

  /**
   * Function which sets new global `Locale` value.
   */
  export function setLocale(localeValue: Locale) {
    locale = localeValue;
  }
}

export default LocaleResolver;
