import { Class, ConstructorType } from "../model/type/Class.type";
import { Context, MetadataType } from "../model/type/Context.type";
import ValidatorMetadata from "./ValidatorMetadata";

declare global {
  interface SymbolConstructor {
    readonly metadata: unique symbol;
  }
}

function metaPropKey(name: string) {
  return `__tdv[${name}]__`;
}

export function getClassFieldNames(constructor: ConstructorType): string[] {
  const instance = new constructor();
  return [
    ...getPropertyNames(instance),
    ...getPropertyNames(instance.__proto__),
  ];
}

function getPropertyNames(object: any): string[] {
  return Object.getOwnPropertyNames(object).filter(
    (property) => property !== "constructor"
  );
}

export function createMetaIfEmpty(context: Context) {
  const { name, metadata } = context;
  const metaKey = metaPropKey(name);
  if (!(metaKey in metadata)) {
    metadata[metaKey] = new ValidatorMetadata();
  }
}

export default class MetadataService<T = unknown> {
  private clazz: Class<T>;
  private metadata: MetadataType;

  constructor(clazz: Class<T>) {
    this.clazz = clazz;
    this.metadata = (this.clazz as any)[Symbol.metadata] as MetadataType;
  }

  get(field: string): ValidatorMetadata<unknown> {
    return this.metadata[metaPropKey(field)] as ValidatorMetadata<unknown>;
  }

  log() {
    console.log(this.metadata);
  }
}
