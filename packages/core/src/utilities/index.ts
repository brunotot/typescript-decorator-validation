import ArraysNamespace from "./impl/Arrays";
import BooleansNamespace from "./impl/Booleans";
import NumbersNamespace from "./impl/Numbers";
import ObjectsNamespace from "./impl/Objects";
import * as StringsNamespace from "./impl/Strings";
import TypesNamespace from "./impl/Types";
import * as EventEmitterNamespace from "./misc/EventEmitter";

/**
 * A namespace which holds utility methods and types regarding native TypeScript types.
 */
namespace Utilities {
  export import Numbers = NumbersNamespace;

  export import Booleans = BooleansNamespace;

  export import Arrays = ArraysNamespace;

  export import Objects = ObjectsNamespace;

  export import Types = TypesNamespace;

  export import Strings = StringsNamespace;

  export namespace Misc {
    export import EventEmitter = EventEmitterNamespace;
  }
}

export default Utilities;
