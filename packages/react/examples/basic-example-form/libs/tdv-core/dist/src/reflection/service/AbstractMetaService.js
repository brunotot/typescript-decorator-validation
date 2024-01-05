var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractMetaService_metadata, _AbstractMetaService_injectionKey, _AbstractMetaService_initial, _AbstractMetaService_class;
import API from "../../../index";
/**
 * Abstract class for managing metadata.
 * @remarks This class provides methods for managing metadata associated with a given strategy. It can be used to get, set, and check for the existence of attributes in the metadata.
 */
export class AbstractMetaService {
    /**
     * Constructor for AbstractMetaService.
     * @param injectionKey - The key used for metadata injection.
     * @param strategy - The strategy for which metadata is managed.
     * @param initial - A function that returns the initial value for the metadata entry.
     */
    constructor(injectionKey, strategy, initial) {
        _AbstractMetaService_metadata.set(this, void 0);
        _AbstractMetaService_injectionKey.set(this, void 0);
        _AbstractMetaService_initial.set(this, void 0);
        _AbstractMetaService_class.set(this, void 0);
        __classPrivateFieldSet(this, _AbstractMetaService_metadata, API.Reflection.getMetadata(strategy), "f");
        __classPrivateFieldSet(this, _AbstractMetaService_injectionKey, injectionKey, "f");
        __classPrivateFieldSet(this, _AbstractMetaService_initial, initial, "f");
        if (API.Reflection.isClass(strategy)) {
            this.class = strategy;
        }
        else {
            this.context = strategy;
        }
    }
    /**
     * Gets the class associated with this AbstractMetaService.
     */
    get class() {
        return __classPrivateFieldGet(this, _AbstractMetaService_class, "f");
    }
    /**
     * Sets the class associated with this AbstractMetaService.
     */
    set class(clazz) {
        __classPrivateFieldSet(this, _AbstractMetaService_class, clazz, "f");
    }
    /**
     * Gets the metadata object.
     */
    get metadata() {
        return __classPrivateFieldGet(this, _AbstractMetaService_metadata, "f");
    }
    /**
     * Gets the data entry from the metadata.
     *
     * @returns The data entry.
     */
    get data() {
        return this.attr(__classPrivateFieldGet(this, _AbstractMetaService_injectionKey, "f"), () => __classPrivateFieldGet(this, _AbstractMetaService_initial, "f").call(this));
    }
    /**
     * Checks if an attribute exists in the metadata.
     *
     * @protected
     * @param key - The key of the attribute.
     * @returns True if the attribute exists, false otherwise.
     */
    hasAttr(key) {
        return key in __classPrivateFieldGet(this, _AbstractMetaService_metadata, "f");
    }
    /**
     * Gets an attribute from the metadata.
     *
     * @param attrKey - The key of the attribute.
     * @param attrDefault - A function that returns the default value for the attribute.
     * @returns The value of the attribute.
     */
    attr(attrKey, attrDefault) {
        if (attrKey in __classPrivateFieldGet(this, _AbstractMetaService_metadata, "f") && !!__classPrivateFieldGet(this, _AbstractMetaService_metadata, "f")[attrKey]) {
            return __classPrivateFieldGet(this, _AbstractMetaService_metadata, "f")[attrKey];
        }
        __classPrivateFieldGet(this, _AbstractMetaService_metadata, "f")[attrKey] = attrDefault === null || attrDefault === void 0 ? void 0 : attrDefault();
        return __classPrivateFieldGet(this, _AbstractMetaService_metadata, "f")[attrKey];
    }
}
_AbstractMetaService_metadata = new WeakMap(), _AbstractMetaService_injectionKey = new WeakMap(), _AbstractMetaService_initial = new WeakMap(), _AbstractMetaService_class = new WeakMap();
