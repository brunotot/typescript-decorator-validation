namespace Localization {
  export type Locale = "en" | "hr" | "de" | "es" | "fr" | "it" | "nl";

  /**
   * Type definition for a collection of locale-specific messages.
   *
   * @remarks
   * The keys are locale codes (e.g. "en", "de"...), and the values are objects
   * in which the key represents a translation identifier while the value
   * corresponds to the identifier's localized string.
   */
  export type Messages = Record<Locale, Record<string, string>>;

  let locale: Localization.Locale = "en";

  export function getLocale(): Localization.Locale {
    return locale;
  }

  export function setLocale(localeValue: Localization.Locale) {
    locale = localeValue;
  }

  export namespace Resolver {
    const DEFAULT_CONFIGURER: (
      locale: Localization.Locale,
      message: string
    ) => string = (_locale, message) => message;

    let configurer: (locale: Localization.Locale, message: string) => string =
      DEFAULT_CONFIGURER;

    export function configure(
      handler?: (locale: Localization.Locale, message: string) => string
    ) {
      configurer = handler ?? DEFAULT_CONFIGURER;
    }

    export function resolve(locale: Locale, message: string) {
      try {
        return configurer(locale, message);
      } catch (error) {
        throw new Error(
          `An error occurred while resolving \"${message}\" for locale \"${locale}\". To fix, check your Localization.Resolver.configure() implementation.\n\n${error}`
        );
      }
    }
  }
}

export default Localization;
