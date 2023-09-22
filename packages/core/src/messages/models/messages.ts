import { LocaleMessages, Locales } from "../message.types";

/**
 * Builds a collection of locale-specific messages.
 *
 * @remarks
 * This function dynamically imports translation files based on the supported `Locales`.
 * It constructs a `LocaleMessages` object where each key is a locale and the value is the corresponding set of messages.
 *
 * @returns A `LocaleMessages` object containing messages for each supported locale.
 *
 * @example
 * ```typescript
 * const messages = buildLocaleMessages();
 * // Output might be: { "en": { "hello": "Hello" }, "de": { "hello": "Hallo" }, ... }
 * ```
 */
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
