import { ValidationGroup } from "../../../decorators/types/DecoratorProps.type";
import { ValidationResult } from "../../../types/ValidationResult.type";
import { Descriptor } from "../../descriptor/ClassDescriptor";
import FieldDescriptor from "../../descriptor/FieldDescriptor";
import MetadataProcessor from "../../processor/MetadataProcessor";
import ValidationStrategy from "../ValidationStrategy";

export default class PrimitiveValidationStrategy<
  TFieldType = any
> extends ValidationStrategy<TFieldType, ValidationResult[], string[]> {
  constructor(descriptor: Descriptor<TFieldType>, defaultValue: TFieldType) {
    super(descriptor, defaultValue);
  }

  get #descriptor() {
    return this.descriptor as FieldDescriptor<TFieldType>;
  }

  test(
    value: any,
    context: any,
    groups: ValidationGroup[] = []
  ): [ValidationResult[], string[]] {
    const fieldName = this.#descriptor.name;
    const metadata = MetadataProcessor.inferFrom(this.#descriptor.host!);
    const field = metadata.field(fieldName);
    const rootRules = field.rules.root;
    const rootResult = rootRules.validate(value, context, groups);
    return [rootResult, rootResult.map((e) => e.message)];
  }
}
