import Localization from "../message.types";

let locale: Localization.Locale = Localization.FALLBACK_LOCALE;

function getLocale(): Localization.Locale {
  return locale;
}

function setLocale(localeValue: Localization.Locale) {
  locale = localeValue;
}

export { getLocale, setLocale };
