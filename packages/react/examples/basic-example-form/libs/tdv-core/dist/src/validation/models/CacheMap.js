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
var _CacheMap_instances, _CacheMap_cache, _CacheMap_payload, _CacheMap_changeFn, _CacheMap_fromCache;
import API from "../../../index";
/**
 * A generic caching utility class used by `ValidationEngine`.
 *
 * @typeParam CacheValue - The type of the cache object.
 * @typeParam Payload - The type of the payload object.
 *
 * @remarks
 * This class provides methods to get and patch cached values based on a payload.
 */
export class CacheMap {
    /**
     * Constructs a new `CacheMap` instance.
     *
     * @param changeFn - A function that takes a payload and returns a new cache value.
     * @param initialValue - An optional initial value for the cache.
     */
    constructor(changeFn, initialValue) {
        _CacheMap_instances.add(this);
        _CacheMap_cache.set(this, void 0);
        _CacheMap_payload.set(this, void 0);
        _CacheMap_changeFn.set(this, void 0);
        __classPrivateFieldSet(this, _CacheMap_cache, initialValue !== null && initialValue !== void 0 ? initialValue : {}, "f");
        __classPrivateFieldSet(this, _CacheMap_payload, {}, "f");
        __classPrivateFieldSet(this, _CacheMap_changeFn, changeFn, "f");
    }
    /**
     * Retrieves a value from the cache.
     *
     * @typeParam CacheKey - The key type of the cache value.
     *
     * @param cacheKey - The key to retrieve the value for.
     * @param payload - An optional payload to use for cache retrieval.
     *
     * @returns The cached value for the given key.
     */
    // prettier-ignore
    get(cacheKey, payload) {
        return payload !== undefined
            ? __classPrivateFieldGet(this, _CacheMap_instances, "m", _CacheMap_fromCache).call(this, payload, cacheKey)
            : __classPrivateFieldGet(this, _CacheMap_cache, "f")[cacheKey];
    }
    /**
     * Patches the cache with new values.
     *
     * @param partialCache - An object containing the new cache values.
     * @param payload - The payload to use for this patch operation.
     *
     * @returns The updated cache object.
     */
    patch(partialCache, _payload) {
        const payload = _payload !== null && _payload !== void 0 ? _payload : __classPrivateFieldGet(this, _CacheMap_payload, "f");
        __classPrivateFieldSet(this, _CacheMap_payload, payload, "f");
        Object.entries(partialCache).forEach(([key, value]) => (__classPrivateFieldGet(this, _CacheMap_cache, "f")[key] = value));
        return __classPrivateFieldGet(this, _CacheMap_cache, "f");
    }
}
_CacheMap_cache = new WeakMap(), _CacheMap_payload = new WeakMap(), _CacheMap_changeFn = new WeakMap(), _CacheMap_instances = new WeakSet(), _CacheMap_fromCache = function _CacheMap_fromCache(payload, cacheKey) {
    const cacheValue = __classPrivateFieldGet(this, _CacheMap_cache, "f")[cacheKey];
    return cacheValue !== undefined && API.Utilities.Objects.deepEquals(__classPrivateFieldGet(this, _CacheMap_payload, "f"), payload)
        ? cacheValue
        : __classPrivateFieldGet(this, _CacheMap_changeFn, "f").call(this, payload)[cacheKey];
};
