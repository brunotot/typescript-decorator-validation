import { ValidationFnMetadata } from "../../processor/EntityProcessor";
import { PropertyTypeGroup } from "./PropertyMetadata";
import { ConstructorCreatorType } from "../../processor/ValidationProcessor";

export default class ValidatorMetadata<T> {
  node: ValidationFnMetadata<T>[];
  children: ValidationFnMetadata<T>[];
  typeGroup: PropertyTypeGroup;
  constructorCreator?: ConstructorCreatorType<T>;

  constructor() {
    this.node = [];
    this.children = [];
    this.typeGroup = "PRIMITIVE";
  }

  setConstructorCreator(constructorCreator: ConstructorCreatorType<T>) {
    this.constructorCreator = constructorCreator;
  }

  setTypeGroup(typeGroup: PropertyTypeGroup) {
    this.typeGroup = typeGroup;
  }

  appendNode(validator: ValidationFnMetadata<T>) {
    this.node.push(validator);
  }

  appendChild(validator: ValidationFnMetadata<T>) {
    this.children.push(validator);
  }
}
