const DEFAULT_CONFIGURER = (_, message) => message;
let configurer = DEFAULT_CONFIGURER;
/**
 * Is used to globally define a custom message parser.
 */
export function configure(handler) {
    configurer = handler !== null && handler !== void 0 ? handler : DEFAULT_CONFIGURER;
}
/**
 * Internal handler for the customized message parser
 */
export function resolve(locale, message) {
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
