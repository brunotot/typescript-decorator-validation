import TranslationServiceNamespace from "./service/translation.service";

/**
 * A namespace which holds everything related to the localized output messages (like default error messages)
 */
namespace Localization {
  export import TranslationService = TranslationServiceNamespace;

  /**
   * 2-character locale string representation
   */
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

  /**
   * Function which returns current global Locale value
   */
  export function getLocale(): Locale {
    return locale;
  }

  /**
   * Function which sets new global Locale value
   */
  export function setLocale(localeValue: Locale) {
    locale = localeValue;
  }

  /**
   * A configuration class which allows for defining a custom message parser
   */
  export namespace MessageResolver {
    /**
     * Message parser definition
     */
    export type MessageResolverData = ((
      locale: Locale,
      message: string
    ) => string) & {};

    const DEFAULT_CONFIGURER: MessageResolverData = (_, message) => message;

    let configurer: MessageResolverData = DEFAULT_CONFIGURER;

    /**
     * Is used to globally define a custom message parser
     */
    export function configure(handler?: MessageResolverData) {
      configurer = handler ?? DEFAULT_CONFIGURER;
    }

    /**
     * Internal handler for the customized message parser
     */
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
