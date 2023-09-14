import { ValidationGroup } from "../../decorators/decorator.types";
import { Payload } from "../../types/Payload.type";
import { ValidationMetadata } from "../../types/ValidationMetadata.type";
import { ValidationResult } from "../../types/ValidationResult.type";

function validationGroupPredicate<TFieldType>(groups: ValidationGroup[]) {
  return (meta: ValidationMetadata<TFieldType>) =>
    groups.length
      ? meta.groups.some((o) => groups.includes(o))
      : !meta.groups.length;
}

export default class FieldDescriptorRule<TFieldType> {
  #contents: ValidationMetadata<TFieldType>[];

  get contents() {
    return this.#contents;
  }

  constructor() {
    this.#contents = [];
  }

  validate<TBody>(
    value: TFieldType,
    payload: Payload<TBody>,
    groups: ValidationGroup[]
  ): ValidationResult[] {
    return this.#contents
      .filter(validationGroupPredicate(groups))
      .map(({ validate }) => validate(value, payload))
      .filter(({ valid }) => !valid);
  }

  pop() {
    return this.#contents.pop()!;
  }

  add(rule: ValidationMetadata<TFieldType>) {
    this.#contents.push(rule);
  }
}
