import { Locale } from "@localization/resolver/LocaleResolver";
import { MessageProp } from "@overrides";

/**
 * Message parser definition.
 * @param locale - current locale
 * @param message - message to parse
 */
export type MessageParser = ((locale: Locale, message: MessageProp, args: Record<string, string>) => string) & {};

const DEFAULT_CONFIGURER: MessageParser = (_, message) => message;

let configurer: MessageParser = DEFAULT_CONFIGURER;

/**
 * Is used to globally define a custom message parser.
 */
export function configureParser(handler?: MessageParser): void {
  configurer = handler ?? DEFAULT_CONFIGURER;
}

/**
 * Internal handler for the customized message parser
 */
export function parseMessage(locale: Locale, message: string, args: Record<string, string> = {}): string {
  try {
    return configurer(locale, message, args);
  } catch (error) {
    const title = `An error occurred while resolving "${message}" for locale "${locale}".`;
    const descr = `To fix, check your Localization.configureParser() implementation or review stack-trace.`;
    const stacktrace = `\n\n${String(error)}`;
    throw new Error(`${title} ${descr} ${stacktrace}`);
  }
}
