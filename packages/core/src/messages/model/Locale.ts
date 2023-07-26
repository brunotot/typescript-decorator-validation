export type Locale = "hr" | "en";

let locale: Locale = "en";

function getLocale(): Locale {
  return locale;
}

function setLocale(localeValue: Locale) {
  locale = localeValue;
}

export { getLocale, setLocale };
