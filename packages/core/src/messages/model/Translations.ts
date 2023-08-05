import * as MessageFormatEn from "../translations/en.json";
import * as MessageFormatHr from "../translations/hr.json";
import { Locale } from "./Locale";

type Translations = Record<string, string>;

const translations: Record<Locale, Translations> = {
  en: MessageFormatEn,
  hr: MessageFormatHr,
};

export default translations;
