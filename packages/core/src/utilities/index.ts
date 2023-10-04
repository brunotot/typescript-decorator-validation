import ArraysNamespace from "./impl/Arrays";
import BooleansNamespace from "./impl/Booleans";
import NumbersNamespace from "./impl/Numbers";
import ObjectsNamespace from "./impl/Objects";
import StringsNamespace from "./impl/Strings";
import TypesNamespace from "./impl/Types";

namespace Utilities {
  export import Numbers = NumbersNamespace;
  export import Booleans = BooleansNamespace;
  export import Arrays = ArraysNamespace;
  export import Objects = ObjectsNamespace;
  export import Strings = StringsNamespace;
  export import Types = TypesNamespace;
}

export default Utilities;
