import { Locale } from "../resolver/LocaleResolver";
import * as en from "../translations/en.json";
/**
 * All translation json files content in map, grouped by `Locale`.
 */
export declare const messages: Messages;
/**
 * Represents translation json file's contents. Is unknown on TypeDocs due to the nature of inferring json contents type.
 */
export type LocalizedMessages = typeof en;
/**
 * Type definition for a collection of locale-specific messages.
 *
 * @remarks
 * The keys are locale codes (e.g. "en", "de"...), and the values are objects
 * in which the key represents a translation identifier while the value
 * corresponds to the identifier's localized string.
 */
export type Messages = Record<Locale, LocalizedMessages>;
export type MessageKey = keyof LocalizedMessages;
/**
 * Returns localized message by key, allowing `locale` to be optional (defaults to global `locale`).
 * @param key Translation key
 * @param locale Locale to translate by
 * @returns Localized message by key.
 */
export declare function getMessage(key: keyof LocalizedMessages, locale?: Locale | null): string;
//# sourceMappingURL=MessageReaderService.d.ts.map