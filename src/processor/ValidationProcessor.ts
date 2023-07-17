import { ValidationFnMetadata } from "./EntityProcessor";
import { PropertyTypeGroup } from "../model/const/PropertyMetadata";
import { ClassCreator } from "../model/type/Class.type";

export default class ValidationProcessor<T = unknown> {
  node: ValidationFnMetadata<T>[] = [];
  children: ValidationFnMetadata<T>[] = [];
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

  appendNode(validator: ValidationFnMetadata<T>) {
    this.node.push(validator);
  }

  appendChild(validator: ValidationFnMetadata<T>) {
    this.children.push(validator);
  }
}
