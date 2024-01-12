import { Classes, Types } from "@utilities";

type FieldDecoratorCtx<T = unknown> = Readonly<{
  kind: "getter" | "method" | "field";
  static: boolean;
  private: boolean;
  name: string;
  metadata?: globalThis.DecoratorMetadataObject;
  access: {
    get: (object: any) => T;
  };
}>;

/** Type alias for strategies that can either be a decorator context or a class. */
export type MetaStrategy = FieldDecoratorCtx<any> | Types.Class<any> | DecoratorContext;

/**
 * Abstract class for managing metadata.
 * @remarks This class provides methods for managing metadata associated with a given strategy. It can be used to get, set, and check for the existence of attributes in the metadata.
 */
export abstract class AbstractMetaService<Entry> {
  #metadata: DecoratorMetadataObject;
  #injectionKey: string;
  #initial: () => Entry;
  #class?: Types.Class<any>;
  protected context?: FieldDecoratorCtx<any>;

  /**
   * Constructor for AbstractMetaService.
   * @param injectionKey - The key used for metadata injection.
   * @param strategy - The strategy for which metadata is managed.
   * @param initial - A function that returns the initial value for the metadata entry.
   */
  constructor(injectionKey: string, strategy: MetaStrategy, initial: () => Entry) {
    this.#metadata = Classes.getMetadata(strategy);
    this.#injectionKey = injectionKey;
    this.#initial = initial;
    if (Classes.isClass(strategy)) {
      this.class = strategy;
    } else {
      this.context = strategy as any;
    }
  }

  /**
   * Gets the class associated with this AbstractMetaService.
   */
  get class(): Types.Class<any> {
    return this.#class!;
  }

  /**
   * Sets the class associated with this AbstractMetaService.
   */
  set class(clazz: Types.Class<any>) {
    this.#class = clazz;
  }

  /**
   * Gets the metadata object.
   */
  get metadata(): DecoratorMetadataObject {
    return this.#metadata;
  }

  /**
   * Gets the data entry from the metadata.
   *
   * @returns The data entry.
   */
  public get data(): Entry {
    return this.attr(this.#injectionKey, () => this.#initial());
  }

  /**
   * Checks if an attribute exists in the metadata.
   *
   * @protected
   * @param key - The key of the attribute.
   * @returns True if the attribute exists, false otherwise.
   */
  protected hasAttr(key: string): boolean {
    return key in this.#metadata;
  }

  /**
   * Gets an attribute from the metadata.
   *
   * @param attrKey - The key of the attribute.
   * @param attrDefault - A function that returns the default value for the attribute.
   * @returns The value of the attribute.
   */
  protected attr<T>(attrKey: string, attrDefault?: () => T): T {
    if (attrKey in this.#metadata && !!this.#metadata[attrKey]) {
      return this.#metadata[attrKey] as T;
    }
    this.#metadata[attrKey] = attrDefault?.();
    return this.#metadata[attrKey] as T;
  }
}
