import LocaleResolver from "../resolver/LocaleResolver";
import * as en from "../translations/en.json";
/**
 * A namespace which handles reading messages from `translations/*.json` files.
 */
declare namespace MessageReaderService {
    /**
     * All translation json files content in map, grouped by `Locale`.
     */
    const messages: Messages;
    /**
     * Represents translation json file's contents. Is unknown on TypeDocs due to the nature of inferring json contents type.
     */
    type LocalizedMessages = typeof en;
    /**
     * Type definition for a collection of locale-specific messages.
     *
     * @remarks
     * The keys are locale codes (e.g. "en", "de"...), and the values are objects
     * in which the key represents a translation identifier while the value
     * corresponds to the identifier's localized string.
     */
    type Messages = Record<LocaleResolver.Locale, LocalizedMessages>;
    type MessageKey = keyof LocalizedMessages;
    /**
     * Returns localized message by key, allowing `locale` to be optional (defaults to global `locale`).
     * @param key Translation key
     * @param locale Locale to translate by
     * @returns Localized message by key.
     */
    function getMessage(key: keyof LocalizedMessages, locale?: LocaleResolver.Locale | null): string;
}
export default MessageReaderService;
//# sourceMappingURL=MessageReaderService.d.ts.map