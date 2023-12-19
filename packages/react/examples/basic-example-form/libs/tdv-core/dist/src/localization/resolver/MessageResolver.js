/**
 * A configuration class which allows for defining a custom message parser.
 */
var MessageResolver;
(function (MessageResolver) {
    const DEFAULT_CONFIGURER = (_, message) => message;
    let configurer = DEFAULT_CONFIGURER;
    /**
     * Is used to globally define a custom message parser.
     */
    function configure(handler) {
        configurer = handler !== null && handler !== void 0 ? handler : DEFAULT_CONFIGURER;
    }
    MessageResolver.configure = configure;
    /**
     * Internal handler for the customized message parser
     */
    function resolve(locale, message) {
        try {
            return configurer(locale, message);
        }
        catch (error) {
            const title = `An error occurred while resolving "${message}" for locale "${locale}".`;
            const descr = `To fix, check your Localization.Resolver.MessageResolver.configure() implementation or review stack-trace.`;
            const stacktrace = `\n\n${String(error)}`;
            throw new Error(`${title} ${descr} ${stacktrace}`);
        }
    }
    MessageResolver.resolve = resolve;
})(MessageResolver || (MessageResolver = {}));
export default MessageResolver;
