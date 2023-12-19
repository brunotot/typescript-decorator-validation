var _a;
var _b;
import * as CacheMapNamespace from "./models/CacheMap";
import * as ValidationEngineNamespace from "./models/ValidationEngine";
(_a = (_b = Symbol).metadata) !== null && _a !== void 0 ? _a : (_b.metadata = Symbol("Symbol.metadata"));
/**
 * A collection of types and functions related to validation.
 */
var Validation;
(function (Validation) {
    Validation.CacheMap = CacheMapNamespace.CacheMap;
    Validation.ValidationEngine = ValidationEngineNamespace.ValidationEngine;
})(Validation || (Validation = {}));
export default Validation;
