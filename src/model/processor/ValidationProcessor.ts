import { PropertyTypeGroup } from "../metadata/PropertyMetadata";
import { ClassCreator } from "../../types/Class.type";
import { ValidationMetadata } from "../../types/ValidationMetadata.type";

export default class ValidationProcessor<T = unknown> {
  node: ValidationMetadata<T>[] = [];
  children: ValidationMetadata<T>[] = [];
  #isInitialTypeGroup: boolean = true;
  #typeGroup: PropertyTypeGroup = "PRIMITIVE";
  constructorCreator?: ClassCreator<T>;

  get isInitialTypeGroup() {
    return this.#isInitialTypeGroup;
  }

  get typeGroup() {
    return this.#typeGroup;
  }

  set typeGroup(typeGroup: PropertyTypeGroup) {
    this.#isInitialTypeGroup = false;
    this.#typeGroup = typeGroup;
  }

  appendNode(validator: ValidationMetadata<T>) {
    this.node.push(validator);
  }

  appendChild(validator: ValidationMetadata<T>) {
    this.children.push(validator);
  }
}
