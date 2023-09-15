import { LocaleMessages, Locales } from "../message.types";

function buildLocaleMessages(): LocaleMessages {
  return Locales.reduce(
    (result, locale) => ({
      ...result,
      [locale]: require(`../translations/${locale}.json`),
    }),
    {}
  ) as LocaleMessages;
}

export default buildLocaleMessages();
