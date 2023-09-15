import { LocalizedMessages } from "../message.types";
import * as MessageFormatDe from "../translations/de.json";
import * as MessageFormatEn from "../translations/en.json";
import * as MessageFormatEs from "../translations/es.json";
import * as MessageFormatFr from "../translations/fr.json";
import * as MessageFormatHr from "../translations/hr.json";
import * as MessageFormatIt from "../translations/it.json";
import * as MessageFormatNl from "../translations/nl.json";

const localizedMessages: LocalizedMessages = {
  en: MessageFormatEn,
  hr: MessageFormatHr,
  de: MessageFormatDe,
  es: MessageFormatEs,
  fr: MessageFormatFr,
  it: MessageFormatIt,
  nl: MessageFormatNl,
};

export default localizedMessages;
