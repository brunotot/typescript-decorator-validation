import { Class } from "../../types/Class.type";
import { IDescriptor } from "./ClassDescriptor";
import FieldDescriptorRule from "./FieldDescriptorRule";

export type PropertyTypeGroup =
  | "PRIMITIVE_ARRAY"
  | "OBJECT_ARRAY"
  | "OBJECT"
  | "PRIMITIVE";

export type FieldDescriptorRules<FieldType> = {
  root: FieldDescriptorRule<FieldType>;
  foreach: FieldDescriptorRule<FieldType>;
};

export default class FieldDescriptor<FieldType>
  implements IDescriptor<FieldType>
{
  #rules: FieldDescriptorRules<FieldType>;

  #name: string;

  host?: Class<unknown>;

  default?: FieldType;

  class?: Class<any>;

  get name(): string {
    return this.#name ?? "";
  }

  get rules() {
    return this.#rules;
  }

  constructor(name: string) {
    this.#name = name;
    this.#rules = {
      root: new FieldDescriptorRule(),
      foreach: new FieldDescriptorRule(),
    };
  }

  get strategy(): PropertyTypeGroup {
    return Array.isArray(this.default)
      ? this.class
        ? "OBJECT_ARRAY"
        : "PRIMITIVE_ARRAY"
      : this.class
      ? "OBJECT"
      : "PRIMITIVE";
  }
}
