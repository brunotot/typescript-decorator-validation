import { Locale } from "../message.types";
import * as MessageFormatEn from "../translations/en.json";
import * as MessageFormatHr from "../translations/hr.json";

export type LocalizedMessages = Record<Locale, Messages>;

export type Messages = Record<string, string>;

const localizedMessages: LocalizedMessages = {
  en: MessageFormatEn,
  hr: MessageFormatHr,
};

export default localizedMessages;
