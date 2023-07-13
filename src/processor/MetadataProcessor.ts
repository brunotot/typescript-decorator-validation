import { Class } from "../model/type/Class.type";
import { Context, MetadataType } from "../model/type/Context.type";

const META_KEY = "tdv:metadata-processor";

export default class MetadataProcessor {
  #data: Map<string, unknown>;

  private constructor() {
    this.#data = new Map();
  }

  getOrDefault<T>(key: string, defaultValueSupplier: () => T): T {
    return this.#data.has(key)
      ? (this.#data.get(key) as T)
      : this.set(key, defaultValueSupplier());
  }

  get<T>(key: string): T {
    return this.#data.get(key) as T;
  }

  set<T>(key: string, value: T): T {
    this.#data.set(key, value);
    return value;
  }

  read() {
    console.log(this.#data);
  }

  static fromContext(context: Context<unknown>): MetadataProcessor {
    return MetadataProcessor.#buildProcessor(context.metadata);
  }

  static fromClass<T>(clazz: Class<T>): MetadataProcessor {
    // @ts-ignore
    return MetadataProcessor.#buildProcessor(clazz[Symbol.metadata]);
  }

  static #buildProcessor(meta: MetadataType): MetadataProcessor {
    if (META_KEY in meta && meta[META_KEY] instanceof MetadataProcessor) {
      return meta[META_KEY];
    }
    const processor = new MetadataProcessor();
    meta[META_KEY] = processor;
    return processor;
  }
}
