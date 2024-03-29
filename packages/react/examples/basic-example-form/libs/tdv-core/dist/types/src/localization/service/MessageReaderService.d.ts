import { type Locale } from "../resolver/LocaleResolver";
import en from "../translations/en.json";
/**
 * Represents the union of all predefined validator decorator keys (and extras) which `tdv-core` provides.
 * For example, {@link Decorators.Alpha @Alpha\(\)} decorator has a key defined as {@link Decorators.ALPHA ALPHA}
 * (which is also available at the root import through {@link Decorators} module).
 */
export type MessageKey = keyof typeof en;
/**
 * Returns localized message by key, allowing `locale` to be optional (defaults to global `locale`).
 * @param messageKey A key of any predefined decorator validator (or extras) from `tdv-core`
 * @param locale Locale to translate by (`en`, `hr`, `de`, ...)
 * @returns Default translated message by message key
 * @see {@link MessageKey}
 */
export declare function readMessage(messageKey: MessageKey, locale?: Locale | null): string;
//# sourceMappingURL=MessageReaderService.d.ts.map