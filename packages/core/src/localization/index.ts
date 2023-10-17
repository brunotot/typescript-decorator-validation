import LocaleResolverNamespace from "./resolver/LocaleResolver";
import MessageResolverNamespace from "./resolver/MessageResolver";
import MessageReaderServiceNamespace from "./service/MessageReaderService";

/**
 * A namespace which holds everything related to the localized output messages (like default error messages)
 */
namespace Localization {
  /**
   * A namespace which holds all resolvers (middleware for dev folks!).
   */
  export namespace Resolver {
    export import LocaleResolver = LocaleResolverNamespace;
    export import MessageResolver = MessageResolverNamespace;
  }

  /**
   * A namespace which contains service-related actions (create, read and similar) for `Localization`.
   */
  export namespace Service {
    export import MessageReaderService = MessageReaderServiceNamespace;
  }
}

export default Localization;