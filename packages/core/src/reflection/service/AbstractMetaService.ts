import API from "../../../index";

/**
 * Abstract class for managing metadata.
 *
 * @remarks
 * This class provides methods for managing metadata associated with a given strategy.
 * It can be used to get, set, and check for the existence of attributes in the metadata.
 */
export abstract class AbstractMetaService<Entry> {
  #metadata: DecoratorMetadataObject;
  #injectionKey: string;
  #initial: () => Entry;
  #class?: API.Utilities.Types.Class<any>;
  protected context?: API.Decorator.ForField.Basic.Context<any>;

  /**
   * Constructor for AbstractMetaService.
   *
   * @param injectionKey - The key used for metadata injection.
   * @param strategy - The strategy for which metadata is managed.
   * @param initial - A function that returns the initial value for the metadata entry.
   */
  constructor(injectionKey: string, strategy: API.Reflection.MetaStrategy, initial: () => Entry) {
    this.#metadata = API.Reflection.getMetadata(strategy);
    this.#injectionKey = injectionKey;
    this.#initial = initial;
    if (API.Reflection.isClass(strategy)) {
      this.class = strategy;
    } else {
      this.context = strategy as any;
    }
  }

  /**
   * Gets the class associated with this AbstractMetaService.
   */
  get class(): API.Utilities.Types.Class<any> {
    return this.#class!;
  }

  /**
   * Sets the class associated with this AbstractMetaService.
   */
  set class(clazz: API.Utilities.Types.Class<any>) {
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
