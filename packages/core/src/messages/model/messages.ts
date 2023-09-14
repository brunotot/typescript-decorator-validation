import { Locale } from "../message.types";
import * as MessageFormatDe from "../translations/de.json";
import * as MessageFormatEn from "../translations/en.json";
import * as MessageFormatEs from "../translations/es.json";
import * as MessageFormatFr from "../translations/fr.json";
import * as MessageFormatHr from "../translations/hr.json";

export type LocalizedMessages = Record<Locale, Messages>;

export type Messages = Record<string, string>;

const localizedMessages: LocalizedMessages = {
  en: MessageFormatEn,
  hr: MessageFormatHr,
  de: MessageFormatDe,
  es: MessageFormatEs,
  fr: MessageFormatFr,
};

export default localizedMessages;
