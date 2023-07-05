import { ValidationFnMetadata } from "../handler/ValidationHandler";
import { PropertyTypeGroup } from "../model/const/PropertyMetadata";
import { ConstructorCreatorType } from "../model/const/Strategy";

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
