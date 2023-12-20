import ObjectsNamespace from "./impl/Objects";
import * as StringsNamespace from "./impl/Strings";
import * as EventEmitterNamespace from "./misc/EventEmitter";
/**
 * A namespace which holds utility methods and types regarding native TypeScript types.
 */
var Utilities;
(function (Utilities) {
    Utilities.Objects = ObjectsNamespace;
    Utilities.Strings = StringsNamespace;
    let Misc;
    (function (Misc) {
        Misc.EventEmitter = EventEmitterNamespace;
    })(Misc = Utilities.Misc || (Utilities.Misc = {}));
})(Utilities || (Utilities = {}));
export default Utilities;
