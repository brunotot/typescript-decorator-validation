import * as _Decorator from "./decorators";
import * as _collection from "./decorators/data";
import * as _attribute from "./decorators/data/structural/attribute";
import * as _Localization from "./localization";
import * as _Reflection from "./reflection";
import * as _Strategy from "./strategy";
import * as _Utilities from "./utilities";
import * as _Validation from "./validation";
/** `tdv-core` API entry-point. */
declare namespace API {
    export import Localization = _Localization;
    export import Validation = _Validation;
    export import Decorator = _Decorator;
    export import Utilities = _Utilities;
    export import Reflection = _Reflection;
    export import collection = _collection;
    export import attribute = _attribute.attribute;
    export import Strategy = _Strategy;
    /**
     * Configuration object for the `tdv-core` package.
     */
    const Configuration: {
        /**
         * The delay in milliseconds for async validation. Defaults to `500 ms`
         */
        asyncValidationDelay: number;
    };
}
export default API;
//# sourceMappingURL=index.d.ts.map