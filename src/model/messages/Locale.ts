export enum Locale {
  HR = "hr",
  EN = "en",
}

let locale = Locale.EN;

function getLocale() {
  return locale;
}

function setLocale(localeValue: Locale) {
  locale = localeValue;
}

export { getLocale, setLocale };
