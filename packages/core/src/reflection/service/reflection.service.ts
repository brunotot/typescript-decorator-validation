import Decorator from "../../types/namespace/decorator.namespace";
import Class from "../../types/validation/class.type";

export function getClassFieldDescriptor<TClass>(
  constructor: Class<TClass>,
  name: keyof TClass
) {
  const instance: any = new constructor();
  const prototype = instance.__proto__;
  return Object.getOwnPropertyDescriptor(prototype, name);
}

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

export type MetaStrategy = Decorator.Context | Class<any>;

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

export function isClass(strategy: MetaStrategy): strategy is Class<any> {
  return typeof strategy === "function";
}

export default abstract class MetaService<Entry> {
  #metadata: DecoratorMetadataObject;
  #injectionKey: string;
  #initial: () => Entry;
  #class?: Class<any>;
  protected context?: Decorator.Context;

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

  get class() {
    return this.#class!;
  }

  set class(clazz: Class<any>) {
    this.#class = clazz;
  }

  get metadata(): DecoratorMetadataObject {
    return this.#metadata;
  }

  protected get data(): Entry {
    return this.attr(this.#injectionKey, () => this.#initial());
  }

  protected hasAttr(key: string) {
    return key in this.#metadata;
  }

  protected attr<T>(attrKey: string, attrDefault?: () => T): T {
    if (attrKey in this.#metadata && !!this.#metadata[attrKey]) {
      return this.#metadata[attrKey] as T;
    }
    this.#metadata[attrKey] = attrDefault?.();
    return this.#metadata[attrKey] as T;
  }
}
