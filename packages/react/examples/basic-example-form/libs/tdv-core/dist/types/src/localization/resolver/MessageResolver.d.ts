import type * as LocaleResolver from "./LocaleResolver";
/**
 * Message parser definition.
 */
export type MessageParser = ((locale: LocaleResolver.Locale, message: string) => string) & {};
/**
 * Is used to globally define a custom message parser.
 */
export declare function configureParser(handler?: MessageParser): void;
/**
 * Internal handler for the customized message parser
 */
export declare function parseMessage(locale: LocaleResolver.Locale, message: string): string;
//# sourceMappingURL=MessageResolver.d.ts.map