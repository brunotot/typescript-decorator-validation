import * as LocaleResolver from "./LocaleResolver";
/**
 * Message parser definition.
 */
export type MessageResolverData = ((locale: LocaleResolver.Locale, message: string) => string) & {};
/**
 * Is used to globally define a custom message parser.
 */
export declare function configure(handler?: MessageResolverData): void;
/**
 * Internal handler for the customized message parser
 */
export declare function resolve(locale: LocaleResolver.Locale, message: string): string;
//# sourceMappingURL=MessageResolver.d.ts.map