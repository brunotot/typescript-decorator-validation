import { Locale, LocaleDefault } from "../message.types";

let locale: Locale = LocaleDefault;

function getLocale(): Locale {
  return locale;
}

function setLocale(localeValue: Locale) {
  locale = localeValue;
}

export { getLocale, setLocale };
