import TranslationServiceNs from "./service/translation.service";

namespace Localization {
  export import TranslationService = TranslationServiceNs;

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

  let locale: Locale = "en";

  export function getLocale(): Locale {
    return locale;
  }

  export function setLocale(localeValue: Locale) {
    locale = localeValue;
  }

  export namespace MessageResolver {
    export type MessageResolverData = (
      locale: Locale,
      message: string
    ) => string;

    const DEFAULT_CONFIGURER: MessageResolverData = (_, message) => message;

    let configurer: MessageResolverData = DEFAULT_CONFIGURER;

    export function configure(handler?: MessageResolverData) {
      configurer = handler ?? DEFAULT_CONFIGURER;
    }

    export function resolve(locale: Locale, message: string) {
      try {
        return configurer(locale, message);
      } catch (error) {
        const title = `An error occurred while resolving \"${message}\" for locale \"${locale}\".`;
        const descr = `To fix, check your Localization.Resolver.configure() implementation.`;
        const stacktrace = `\n\n${error}`;
        throw new Error(`${title} ${descr} ${stacktrace}`);
      }
    }
  }
}

export default Localization;
