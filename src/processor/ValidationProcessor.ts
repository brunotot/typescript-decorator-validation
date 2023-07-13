import { ValidationFnMetadata } from "../handler/ValidationHandler";

export default class ValidationProcessor<T = unknown> {
  node: ValidationFnMetadata<T>[] = [];
  children: ValidationFnMetadata<T>[] = [];

  appendNode(validator: ValidationFnMetadata<T>) {
    this.node.push(validator);
  }

  appendChild(validator: ValidationFnMetadata<T>) {
    this.children.push(validator);
  }
}
