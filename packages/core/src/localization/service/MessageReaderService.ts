import LocaleResolver from "../resolver/LocaleResolver";

import * as de from "../translations/de.json";
import * as en from "../translations/en.json";
import * as es from "../translations/es.json";
import * as fr from "../translations/fr.json";
import * as hr from "../translations/hr.json";
import * as it from "../translations/it.json";
import * as nl from "../translations/nl.json";

namespace MessageReaderService {
  export const messages: Messages = {
    hr,
    de,
    en,
    es,
    fr,
    it,
    nl,
  };

  export type LocalizedMessages = typeof en;

  /**
   * Type definition for a collection of locale-specific messages.
   *
   * @remarks
   * The keys are locale codes (e.g. "en", "de"...), and the values are objects
   * in which the key represents a translation identifier while the value
   * corresponds to the identifier's localized string.
   */
  export type Messages = Record<LocaleResolver.Locale, LocalizedMessages>;

  export function getMessage(
    key: keyof LocalizedMessages,
    locale?: LocaleResolver.Locale | null
  ): string {
    const computedLocale = locale ?? LocaleResolver.getLocale();
    const computedLocaleMessages = messages[computedLocale];
    return computedLocaleMessages[key];
  }
}

export default MessageReaderService;
