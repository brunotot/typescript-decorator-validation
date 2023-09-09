import { DecoratorContextMetadata } from "../../decorators/types/DecoratorContext.type";
import { Class } from "../../types/Class.type";
import ValidationProcessor from "./ValidationProcessor";

export default class MetadataProcessor {
  static #META_KEY = "tdv:metadata-processor" as const;

  #content: Map<string, unknown>;

  static inferFrom(strategy: DecoratorContextMetadata | Class<any>) {
    return MetadataProcessor.#isConstructorStrategy(strategy)
      ? MetadataProcessor.#fromConstructor(strategy)
      : MetadataProcessor.#fromMetadata(strategy);
  }

  private constructor() {
    this.#content = new Map();
  }

  getValidationProcessor<T = unknown>(key: string) {
    return this.get(key, () => new ValidationProcessor<T>());
  }

  has(key: string) {
    return this.#content.has(key);
  }

  get<T>(key: string): T | null;
  get<T>(key: string, ifEmptySupplier: () => T): T;
  get<T>(key: string, ifEmptySupplier?: () => T): T | null {
    return this.has(key)
      ? (this.#content.get(key) as T)
      : ifEmptySupplier
      ? this.set(key, ifEmptySupplier())
      : null;
  }

  set<T>(key: string, value: T): T {
    this.#content.set(key, value);
    return value;
  }

  static #fromMetadata(metadata: DecoratorContextMetadata): MetadataProcessor {
    return MetadataProcessor.#buildProcessor(metadata);
  }

  static #fromConstructor(constructor: Class<any>) {
    const clazz: any = constructor;
    clazz[Symbol.metadata] ??= {};
    return MetadataProcessor.#buildProcessor(clazz[Symbol.metadata]);
  }

  static #buildProcessor(meta: DecoratorContextMetadata): MetadataProcessor {
    const META_KEY = MetadataProcessor.#META_KEY;
    return META_KEY in meta && meta[META_KEY] instanceof MetadataProcessor
      ? meta[META_KEY]
      : (meta[META_KEY] = new MetadataProcessor());
  }

  static #isConstructorStrategy(
    strategy: DecoratorContextMetadata | Class<any>
  ): strategy is Class<any> {
    return typeof strategy === "function";
  }
}
