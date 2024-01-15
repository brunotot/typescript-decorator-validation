import { type Locale } from "@localization/resolver/LocaleResolver";
import { type MessageProp } from "@overrides";

/**
 * Message parser definition.
 * @param {Locale} locale - Current locale
 * @param {MessageProp} message - Message to parse
 * @param {Record<string,string>} args - Arguments to parse message with
 */
export type MessageParser = ((locale: Locale, message: MessageProp, args: Record<string, string>) => string) & {};

const DEFAULT_MESSAGE_PARSER: MessageParser = (_, message) => String(message);

const messageParser: MessageParser = DEFAULT_MESSAGE_PARSER;

/** Returns the current global {@link MessageParser `MessageParser`} value. */
export function getMessageParser(): MessageParser {
  return messageParser;
}

/** Sets the global {@link MessageParser `MessageParser`} to the specified value (pass `undefined` to revert to default). */
export function setMessageParser(messageParser?: MessageParser): void {
  messageParser = messageParser ?? DEFAULT_MESSAGE_PARSER;
}
