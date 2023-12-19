import LocaleResolver from "../resolver/LocaleResolver";
import * as de from "../translations/de.json";
import * as en from "../translations/en.json";
import * as es from "../translations/es.json";
import * as fr from "../translations/fr.json";
import * as hr from "../translations/hr.json";
import * as it from "../translations/it.json";
import * as nl from "../translations/nl.json";
/**
 * A namespace which handles reading messages from `translations/*.json` files.
 */
var MessageReaderService;
(function (MessageReaderService) {
    /**
     * All translation json files content in map, grouped by `Locale`.
     */
    MessageReaderService.messages = {
        hr,
        de,
        en,
        es,
        fr,
        it,
        nl,
    };
    /**
     * Returns localized message by key, allowing `locale` to be optional (defaults to global `locale`).
     * @param key Translation key
     * @param locale Locale to translate by
     * @returns Localized message by key.
     */
    function getMessage(key, locale) {
        const computedLocale = locale !== null && locale !== void 0 ? locale : LocaleResolver.getLocale();
        const computedLocaleMessages = MessageReaderService.messages[computedLocale];
        return computedLocaleMessages[key];
    }
    MessageReaderService.getMessage = getMessage;
})(MessageReaderService || (MessageReaderService = {}));
export default MessageReaderService;
