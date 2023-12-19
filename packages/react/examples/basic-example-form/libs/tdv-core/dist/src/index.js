import _collection from "../collection";
import * as _create from "./../collection/any/create";
import * as _attribute from "./../collection/class/attribute";
import _Decorator from "./decorators";
import _Localization from "./localization";
import _Reflection from "./reflection";
import _Strategy from "./strategy";
import _Utilities from "./utilities";
import _Validation from "./validation";
/** `tdv-core` API entry-point. */
var API;
(function (API) {
    API.Localization = _Localization;
    API.Validation = _Validation;
    API.Decorator = _Decorator;
    API.Strategy = _Strategy;
    API.Utilities = _Utilities;
    API.Reflection = _Reflection;
    API.collection = _collection;
    API.create = _create.create;
    API.attribute = _attribute.attribute;
})(API || (API = {}));
export default API;
