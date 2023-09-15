import { Class } from "../../types/Class.type";
import ValidationRuleProcessor from "../processor/validation-rule.processor";
import { IDescriptor } from "./class.descriptor";

export type PropertyTypeGroup =
  | "PRIMITIVE_ARRAY"
  | "OBJECT_ARRAY"
  | "OBJECT"
  | "PRIMITIVE";

export type FieldDescriptorRules<FieldType> = {
  root: ValidationRuleProcessor<FieldType>;
  foreach: ValidationRuleProcessor<FieldType>;
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
      root: new ValidationRuleProcessor(),
      foreach: new ValidationRuleProcessor(),
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
