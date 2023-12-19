import type LocaleResolver from "./LocaleResolver";
/**
 * A configuration class which allows for defining a custom message parser.
 */
declare namespace MessageResolver {
    /**
     * Message parser definition.
     */
    type MessageResolverData = ((locale: LocaleResolver.Locale, message: string) => string) & {};
    /**
     * Is used to globally define a custom message parser.
     */
    function configure(handler?: MessageResolverData): void;
    /**
     * Internal handler for the customized message parser
     */
    function resolve(locale: LocaleResolver.Locale, message: string): string;
}
export default MessageResolver;
//# sourceMappingURL=MessageResolver.d.ts.map