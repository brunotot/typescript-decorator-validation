import { ValidationGroup } from "../../decorators/types/DecoratorProps.type";
import { Payload } from "../../types/Payload.type";
import { ValidationMetadata } from "../../types/ValidationMetadata.type";
import { ValidationResult } from "../../types/ValidationResult.type";
import { isValidationGroupUnion } from "../../utils/decorator.utils";

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
    return this.validators(groups)
      .map(({ validate }) => validate(value, payload))
      .filter(({ valid }) => !valid);
  }

  validators(groups: ValidationGroup[]) {
    return this.contents.filter((meta) =>
      isValidationGroupUnion(groups, meta.groups)
    );
  }

  pop() {
    return this.#contents.pop()!;
  }

  add(rule: ValidationMetadata<TFieldType>) {
    this.#contents.push(rule);
  }
}
