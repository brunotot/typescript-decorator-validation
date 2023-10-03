import $ from "../../types/index";

namespace CacheMap {
  /**
   * A generic caching utility class used by `ValidationEngine`.
   *
   * @typeParam CacheValue - The type of the cache object.
   * @typeParam Payload - The type of the payload object.
   *
   * @remarks
   * This class provides methods to get and patch cached values based on a payload.
   */
  export class CacheMap<CacheValue extends object & {}, Payload = any> {
    #cache: CacheValue;
    #payload: Payload;
    #changeFn: (state: Payload) => CacheValue;

    /**
     * Constructs a new `CacheMap` instance.
     *
     * @param changeFn - A function that takes a payload and returns a new cache value.
     * @param initialValue - An optional initial value for the cache.
     */
    constructor(
      changeFn: (state: Payload) => CacheValue,
      initialValue?: CacheValue
    ) {
      this.#cache = initialValue ?? ({} as CacheValue);
      this.#payload = {} as Payload;
      this.#changeFn = changeFn;
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
    get<CacheKey extends keyof CacheValue>(cacheKey: CacheKey, payload?: Payload): CacheValue[CacheKey] {
    return payload
      ? this.#fromCache(payload!, cacheKey)
      : this.#cache[cacheKey];
  }

    /**
     * Patches the cache with new values.
     *
     * @param partialCache - An object containing the new cache values.
     * @param payload - The payload to use for this patch operation.
     *
     * @returns The updated cache object.
     */
    patch(partialCache: Partial<CacheValue>, _payload?: Payload): CacheValue {
      const payload = _payload ?? this.#payload;
      this.#payload = payload;
      Object.entries(partialCache).forEach(
        ([key, value]) => ((this.#cache as any)[key] = value)
      );
      return this.#cache;
    }

    /**
     * Internal method to retrieve a value from the cache based on a payload.
     *
     * @typeParam CacheKey - The key type of the cache value.
     *
     * @param payload - The payload to use for cache retrieval.
     * @param cacheKey - The key to retrieve the value for.
     *
     * @returns The cached value for the given key.
     *
     * @private
     */
    #fromCache<CacheKey extends keyof CacheValue>(
      payload: Payload,
      cacheKey: CacheKey
    ): CacheValue[CacheKey] {
      const cacheValue: CacheValue[CacheKey] = this.#cache[cacheKey];
      return cacheValue !== undefined &&
        $.Objects.deepEquals(this.#payload, payload)
        ? cacheValue
        : this.#changeFn(payload)[cacheKey];
    }
  }
}

export default CacheMap;
