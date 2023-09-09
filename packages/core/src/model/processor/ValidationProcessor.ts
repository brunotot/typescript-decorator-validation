import { ClassCreator } from "../../types/Class.type";
import { ValidationMetadata } from "../../types/ValidationMetadata.type";
import { PropertyTypeGroup } from "../metadata/PropertyMetadata";

export default class ValidationProcessor<T = unknown> {
  node: ValidationMetadata<T>[] = [];
  children: ValidationMetadata<T>[] = [];
  #typeGroup: PropertyTypeGroup = "PRIMITIVE";
  constructorCreator?: ClassCreator<T>;

  get typeGroup() {
    return this.#typeGroup;
  }

  set typeGroup(typeGroup: PropertyTypeGroup) {
    this.#typeGroup = typeGroup;
  }

  appendNode(validator: ValidationMetadata<T>) {
    this.node.push(validator);
  }

  appendChild(validator: ValidationMetadata<T>) {
    this.children.push(validator);
  }
}
