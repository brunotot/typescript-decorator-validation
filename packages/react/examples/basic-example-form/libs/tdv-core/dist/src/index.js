import * as _Decorator from "./decorators";
import * as _collection from "./decorators/data";
import * as _attribute from "./decorators/data/structural/attribute";
import * as _Localization from "./localization";
import * as _Reflection from "./reflection";
import * as _Utilities from "./utilities";
import * as _Validation from "./validation";
//
import _Strategy from "./strategy";
/** `tdv-core` API entry-point. */
var API;
(function (API) {
    API.Localization = _Localization;
    API.Validation = _Validation;
    API.Decorator = _Decorator;
    API.Utilities = _Utilities;
    API.Reflection = _Reflection;
    API.collection = _collection;
    API.attribute = _attribute.attribute;
    API.Strategy = _Strategy;
    /**
     * Configuration object for the `tdv-core` package.
     */
    API.Configuration = {
        /**
         * The delay in milliseconds for async validation. Defaults to `500 ms`
         */
        asyncValidationDelay: 500,
    };
})(API || (API = {}));
export default API;
