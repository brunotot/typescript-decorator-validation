import LocaleResolverNamespace from "./resolver/LocaleResolver";
import MessageResolverNamespace from "./resolver/MessageResolver";
import MessageReaderServiceNamespace from "./service/MessageReaderService";
import * as TranslationServiceNamespace from "./service/TranslationService";
/**
 * A namespace which holds everything related to the localized output messages (like default error messages)
 */
var Localization;
(function (Localization) {
    /**
     * A namespace which holds all resolvers (middleware for dev folks!).
     */
    let Resolver;
    (function (Resolver) {
        Resolver.LocaleResolver = LocaleResolverNamespace;
        Resolver.MessageResolver = MessageResolverNamespace;
    })(Resolver = Localization.Resolver || (Localization.Resolver = {}));
    /**
     * A namespace which contains service-related actions (create, read and similar) for `Localization`.
     */
    let Service;
    (function (Service) {
        Service.MessageReaderService = MessageReaderServiceNamespace;
        Service.TranslationService = TranslationServiceNamespace;
    })(Service = Localization.Service || (Localization.Service = {}));
})(Localization || (Localization = {}));
export default Localization;
