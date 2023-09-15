import { ValidationGroup } from "../../decorators/decorator.types";
import { Class } from "../../types/Class.type";
import { getClassFieldNames } from "../../utils/class.utils";
import MetadataProcessor from "../processor/metadata.processor";
import FieldDescriptor, { PropertyTypeGroup } from "./field.descriptor";

export interface IDescriptor<TClass = unknown> {
  class?: Class<TClass>;
  default?: TClass;
  strategy: PropertyTypeGroup;
  name: string;
}

export type Descriptor<TField = unknown> =
  | FieldDescriptor<TField>
  | ClassDescriptor<TField>;

export type Descriptors<TClass> = Record<keyof TClass, Descriptor<unknown>>;

export default class ClassDescriptor<TClass = unknown>
  implements IDescriptor<TClass>
{
  #default: TClass;

  #class: Class<TClass>;

  #groups: ValidationGroup[];

  #schema: Descriptors<TClass>;

  #name?: string;

  get name() {
    return (this.#name ?? "") as string;
  }

  get strategy(): PropertyTypeGroup {
    return Array.isArray(this.#default) ? "OBJECT_ARRAY" : "OBJECT";
  }

  get default() {
    return this.#default;
  }

  get groups() {
    return this.#groups;
  }

  get class() {
    return this.#class;
  }

  get schema() {
    return this.#schema;
  }

  constructor(
    clazz: Class<TClass>,
    defaultValue: TClass,
    groups: ValidationGroup[],
    name: string | undefined = undefined
  ) {
    this.#name = name;
    this.#default = defaultValue;
    this.#class = clazz;
    this.#groups = groups;
    this.#schema = this.#buildSchema();
  }

  #buildSchema(): Descriptors<TClass> {
    return getClassFieldNames(this.#class).reduce((result, field) => {
      const meta = MetadataProcessor.inferFrom(this.#class);
      const fieldDescriptor = meta.field(field);
      const innerDefault = this.#default?.[field];
      this.#applyDefaults(fieldDescriptor, innerDefault!);
      const innerClass = fieldDescriptor.class;
      const strategy = fieldDescriptor.strategy;
      const isClassDescriptor = ["OBJECT_ARRAY", "OBJECT"].includes(strategy);

      const descriptor: Descriptor<unknown> = isClassDescriptor
        ? new ClassDescriptor(
            innerClass!,
            innerDefault as any,
            this.#groups,
            field as string
          )
        : fieldDescriptor;

      return {
        ...result,
        [field]: descriptor,
      };
    }, {}) as Descriptors<TClass>;
  }

  #applyDefaults<TKey extends keyof TClass>(
    descriptor: FieldDescriptor<unknown>,
    defaultValue: TClass[TKey]
  ) {
    descriptor.default ??= defaultValue;
    descriptor.host = this.#class;
  }
}
