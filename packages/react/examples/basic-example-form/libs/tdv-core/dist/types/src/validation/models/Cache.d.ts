/**
 * A generic caching utility class used by `ValidationEngine`.
 *
 * @typeParam CacheValue - The type of the cache object.
 * @typeParam Payload - The type of the payload object.
 *
 * @remarks
 * This class provides methods to get and patch cached values based on a payload.
 */
export declare class Cache<CacheValue extends object & {}, Payload = any> {
    #private;
    /**
     * Constructs a new `CacheMap` instance.
     *
     * @param changeFn - A function that takes a payload and returns a new cache value.
     * @param initialValue - An optional initial value for the cache.
     */
    constructor(changeFn: (state: Payload) => CacheValue, initialValue?: CacheValue);
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
    get<CacheKey extends keyof CacheValue>(cacheKey: CacheKey, payload?: Payload): CacheValue[CacheKey];
    /**
     * Patches the cache with new values.
     *
     * @param partialCache - An object containing the new cache values.
     * @param payload - The payload to use for this patch operation.
     *
     * @returns The updated cache object.
     */
    patch(partialCache: Partial<CacheValue>, _payload?: Payload): CacheValue;
}
//# sourceMappingURL=Cache.d.ts.map