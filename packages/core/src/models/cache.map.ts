import $ from "../types/index";

export default class CacheMap<CacheValue extends object & {}, Payload = any> {
  #cache: CacheValue;
  #payload: Payload;
  #changeFn: (state: Payload) => CacheValue;

  constructor(
    changeFn: (state: Payload) => CacheValue,
    initialValue?: CacheValue
  ) {
    this.#cache = initialValue ?? ({} as CacheValue);
    this.#payload = {} as Payload;
    this.#changeFn = changeFn;
  }

  // prettier-ignore
  get<CacheKey extends keyof CacheValue>(cacheKey: CacheKey, payload: Payload): CacheValue[CacheKey];
  // prettier-ignore
  get<CacheKey extends keyof CacheValue>(cacheKey: CacheKey): CacheValue[CacheKey];
  // prettier-ignore
  get<CacheKey extends keyof CacheValue>(cacheKey: CacheKey, payload?: Payload): CacheValue[CacheKey] {
    return payload
      ? this.#fromCache(payload!, cacheKey)
      : this.#cache[cacheKey];
  }

  patch(partialCache: Partial<CacheValue>, payload: Payload): CacheValue {
    this.#payload = payload;
    Object.entries(partialCache).forEach(
      ([key, value]) => ((this.#cache as any)[key] = value)
    );
    return this.#cache;
  }

  #fromCache<CacheKey extends keyof CacheValue>(
    payload: Payload,
    cacheKey: CacheKey
  ): CacheValue[CacheKey] {
    const cacheValue: CacheValue[CacheKey] = this.#cache[cacheKey];
    return cacheValue === undefined ||
      !$.Objects.deepEquals(this.#payload, payload)
      ? this.#changeFn(payload)[cacheKey]
      : cacheValue;
  }
}
