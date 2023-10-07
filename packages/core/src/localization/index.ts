import LocaleResolverNamespace from "./resolver/LocaleResolver";
import MessageResolverNamespace from "./resolver/MessageResolver";
import MessageReaderServiceNamespace from "./service/MessageReaderService";
import TranslationServiceNamespace from "./service/TranslationService";

/**
 * A namespace which holds everything related to the localized output messages (like default error messages)
 */
namespace Localization {
  export namespace Resolver {
    export import LocaleResolver = LocaleResolverNamespace;
    export import MessageResolver = MessageResolverNamespace;
  }

  export namespace Service {
    export import TranslationService = TranslationServiceNamespace;
    export import MessageReaderService = MessageReaderServiceNamespace;
  }
}

export default Localization;
