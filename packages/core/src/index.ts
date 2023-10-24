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
namespace API {
  export import Localization = _Localization;
  export import Validation = _Validation;
  export import Decorator = _Decorator;
  export import Strategy = _Strategy;
  export import Utilities = _Utilities;
  export import Reflection = _Reflection;
  export import collection = _collection;
  export import create = _create.create;
  export import attribute = _attribute.attribute;
}

export default API;
