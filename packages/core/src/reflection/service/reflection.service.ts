import Decorator from "../../decorators";
import Class from "../../types/validation/class.type";

/**
 * Retrieves the property descriptor for a specific field in a class.
 *
 * @param constructor - The class constructor.
 * @param name - The name of the field.
 * @returns The property descriptor for the field.
 */
export function getClassFieldDescriptor<TClass>(
  constructor: Class<TClass>,
  name: keyof TClass
) {
  const instance: any = new constructor();
  const prototype = instance.__proto__;
  return Object.getOwnPropertyDescriptor(prototype, name);
}

/**
 * Retrieves the names of all fields in a class.
 *
 * @param constructor - The class constructor.
 * @returns An array of field names.
 */
export function getClassFieldNames<TClass>(
  constructor: Class<TClass>
): (keyof TClass)[] {
  const getPropertyNames = (classInstance: any) => {
    return Object.getOwnPropertyNames(classInstance ?? {}).filter(
      (property) => property !== "constructor"
    );
  };
  const instance: any = new constructor();
  const prototype = instance.__proto__;
  const instanceProps = getPropertyNames(instance);
  const prototypeProps = getPropertyNames(prototype);
  const uniquePropsSet = new Set([...instanceProps, ...prototypeProps]);
  const uniquePropsArray = [...uniquePropsSet];
  return uniquePropsArray as (keyof TClass)[];
}

/**
 * Type alias for strategies that can either be a decorator context or a class.
 */
export type MetaStrategy = Decorator.Context | Class<any>;

/**
 * Retrieves or initializes metadata for a given strategy.
 *
 * @param strategy - The strategy to get metadata for.
 * @returns The metadata object.
 */
export function metadata(strategy: MetaStrategy): DecoratorMetadataObject {
  if (isClass(strategy)) {
    (Symbol as any).metadata ??= Symbol("Symbol.metadata");
    strategy[Symbol.metadata] ??= {};
    return strategy[Symbol.metadata]!;
  }
  if (!strategy.metadata) {
    (strategy as any).metadata = {};
  }
  return strategy?.metadata;
}

/**
 * Checks if a given strategy is a class.
 *
 * @param strategy - The strategy to check.
 * @returns True if the strategy is a class, false otherwise.
 */
export function isClass(strategy: MetaStrategy): strategy is Class<any> {
  return typeof strategy === "function";
}

/**
 * Abstract class for managing metadata.
 *
 * @remarks
 * This class provides methods for managing metadata associated with a given strategy.
 * It can be used to get, set, and check for the existence of attributes in the metadata.
 */
export default abstract class MetaService<Entry> {
  #metadata: DecoratorMetadataObject;
  #injectionKey: string;
  #initial: () => Entry;
  #class?: Class<any>;
  protected context?: Decorator.Context;

  /**
   * Constructor for MetaService.
   *
   * @param injectionKey - The key used for metadata injection.
   * @param strategy - The strategy for which metadata is managed.
   * @param initial - A function that returns the initial value for the metadata entry.
   */
  constructor(
    injectionKey: string,
    strategy: MetaStrategy,
    initial: () => Entry
  ) {
    this.#metadata = metadata(strategy);
    this.#injectionKey = injectionKey;
    this.#initial = initial;
    if (isClass(strategy)) {
      this.class = strategy;
    } else {
      this.context = strategy;
    }
  }

  /**
   * Gets the class associated with this MetaService.
   */
  get class() {
    return this.#class!;
  }

  /**
   * Sets the class associated with this MetaService.
   */
  set class(clazz: Class<any>) {
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
   * @protected
   * @returns The data entry.
   */
  protected get data(): Entry {
    return this.attr(this.#injectionKey, () => this.#initial());
  }

  /**
   * Checks if an attribute exists in the metadata.
   *
   * @protected
   * @param key - The key of the attribute.
   * @returns True if the attribute exists, false otherwise.
   */
  protected hasAttr(key: string) {
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
