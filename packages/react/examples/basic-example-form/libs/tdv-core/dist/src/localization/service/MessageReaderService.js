"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMessage = void 0;
const LocaleResolver_1 = require("../resolver/LocaleResolver");
const de_json_1 = __importDefault(require("../translations/de.json"));
const en_json_1 = __importDefault(require("../translations/en.json"));
const es_json_1 = __importDefault(require("../translations/es.json"));
const fr_json_1 = __importDefault(require("../translations/fr.json"));
const hr_json_1 = __importDefault(require("../translations/hr.json"));
const it_json_1 = __importDefault(require("../translations/it.json"));
const nl_json_1 = __importDefault(require("../translations/nl.json"));
/** All translation json files content in map, grouped by {@link Locale `Locale`}. */
const __MESSAGE_COLLECTION = { hr: hr_json_1.default, de: de_json_1.default, en: en_json_1.default, es: es_json_1.default, fr: fr_json_1.default, it: it_json_1.default, nl: nl_json_1.default };
/**
 * Returns localized message by key, allowing `locale` to be optional (defaults to global `locale`).
 * @param messageKey A key of any predefined decorator validator (or extras) from `tdv-core`
 * @param locale Locale to translate by (`en`, `hr`, `de`, ...)
 * @returns Default translated message by message key
 * @see {@link MessageKey}
 */
function readMessage(messageKey, locale) {
    const computedLocale = locale !== null && locale !== void 0 ? locale : (0, LocaleResolver_1.getGlobalLocale)();
    const computedLocaleMessages = __MESSAGE_COLLECTION[computedLocale];
    const decoratorMessage = computedLocaleMessages[messageKey];
    return decoratorMessage;
}
exports.readMessage = readMessage;
