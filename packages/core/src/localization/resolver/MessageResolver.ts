import LocaleResolver from "./LocaleResolver";

/**
 * A configuration class which allows for defining a custom message parser
 */
namespace MessageResolver {
  /**
   * Message parser definition
   */
  export type MessageResolverData = ((
    locale: LocaleResolver.Locale,
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
  export function resolve(locale: LocaleResolver.Locale, message: string) {
    try {
      return configurer(locale, message);
    } catch (error) {
      const title = `An error occurred while resolving \"${message}\" for locale \"${locale}\".`;
      const descr = `To fix, check your Localization.Resolver.MessageResolver.configure() implementation.`;
      const stacktrace = `\n\n${error}`;
      throw new Error(`${title} ${descr} ${stacktrace}`);
    }
  }
}

export default MessageResolver;
