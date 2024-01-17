import { type Locale } from "../resolver/LocaleResolver";
import { type MessageProp } from "../../overrides";
/**
 * Message parser definition.
 * @param {Locale} locale - Current locale
 * @param {MessageProp} message - Message to parse
 * @param {Record<string,string>} args - Arguments to parse message with
 */
export type MessageParser = ((locale: Locale, message: MessageProp, args: Record<string, string>) => string) & {};
/** Returns the current global {@link MessageParser `MessageParser`} value. */
export declare function getMessageParser(): MessageParser;
/** Sets the global {@link MessageParser `MessageParser`} to the specified value (pass `undefined` to revert to default). */
export declare function setMessageParser(messageParser?: MessageParser): void;
//# sourceMappingURL=MessageResolver.d.ts.map