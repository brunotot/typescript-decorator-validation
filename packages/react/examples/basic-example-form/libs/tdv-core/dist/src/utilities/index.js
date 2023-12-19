import ObjectsNamespace from "./impl/Objects";
import StringsNamespace from "./impl/Strings";
/**
 * A namespace which holds utility methods and types regarding native TypeScript types.
 */
var Utilities;
(function (Utilities) {
    Utilities.Objects = ObjectsNamespace;
    Utilities.Strings = StringsNamespace;
})(Utilities || (Utilities = {}));
export default Utilities;
