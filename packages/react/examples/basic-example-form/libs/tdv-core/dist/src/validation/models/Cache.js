"use strict";
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
var _Cache_instances, _Cache_cache, _Cache_payload, _Cache_changeFn, _Cache_fromCache;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const _utilities_1 = require("../../utilities");
/**
 * A generic caching utility class used by `ValidationEngine`.
 *
 * @typeParam CacheValue - The type of the cache object.
 * @typeParam Payload - The type of the payload object.
 *
 * @remarks
 * This class provides methods to get and patch cached values based on a payload.
 */
class Cache {
    /**
     * Constructs a new `CacheMap` instance.
     *
     * @param changeFn - A function that takes a payload and returns a new cache value.
     * @param initialValue - An optional initial value for the cache.
     */
    constructor(changeFn, initialValue) {
        _Cache_instances.add(this);
        _Cache_cache.set(this, void 0);
        _Cache_payload.set(this, void 0);
        _Cache_changeFn.set(this, void 0);
        __classPrivateFieldSet(this, _Cache_cache, initialValue !== null && initialValue !== void 0 ? initialValue : {}, "f");
        __classPrivateFieldSet(this, _Cache_payload, {}, "f");
        __classPrivateFieldSet(this, _Cache_changeFn, changeFn, "f");
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
            ? __classPrivateFieldGet(this, _Cache_instances, "m", _Cache_fromCache).call(this, payload, cacheKey)
            : __classPrivateFieldGet(this, _Cache_cache, "f")[cacheKey];
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
        const payload = _payload !== null && _payload !== void 0 ? _payload : __classPrivateFieldGet(this, _Cache_payload, "f");
        __classPrivateFieldSet(this, _Cache_payload, payload, "f");
        Object.entries(partialCache).forEach(([key, value]) => (__classPrivateFieldGet(this, _Cache_cache, "f")[key] = value));
        return __classPrivateFieldGet(this, _Cache_cache, "f");
    }
}
exports.Cache = Cache;
_Cache_cache = new WeakMap(), _Cache_payload = new WeakMap(), _Cache_changeFn = new WeakMap(), _Cache_instances = new WeakSet(), _Cache_fromCache = function _Cache_fromCache(payload, cacheKey) {
    const cacheValue = __classPrivateFieldGet(this, _Cache_cache, "f")[cacheKey];
    return cacheValue !== undefined && _utilities_1.Objects.deepEquals(__classPrivateFieldGet(this, _Cache_payload, "f"), payload)
        ? cacheValue
        : __classPrivateFieldGet(this, _Cache_changeFn, "f").call(this, payload)[cacheKey];
};
