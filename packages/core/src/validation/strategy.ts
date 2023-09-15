import { ValidationGroup } from "../decorators/decorator.types";
import { Descriptor } from "../model/descriptor/class.descriptor";
import FieldDescriptor from "../model/descriptor/field.descriptor";
import { EntityProcessorConfig } from "../model/processor/entity.processor";
import MetadataProcessor from "../model/processor/metadata.processor";

export default abstract class ValidationStrategy<
  TFieldType = any,
  TDetailedResult = any,
  TSimpleResult = any
> {
  #descriptor: Descriptor<TFieldType>;
  #defaultParent: TFieldType;
  #fieldDescriptor?: FieldDescriptor<TFieldType>;

  constructor(descriptor: Descriptor<TFieldType>, defaultValue: TFieldType) {
    this.#descriptor = descriptor;
    this.#defaultParent = defaultValue;
  }

  protected getEntityProcessorConfig(
    groups: ValidationGroup[]
  ): EntityProcessorConfig<TFieldType> {
    return {
      defaultValue: this.defaultValue,
      groups,
    };
  }

  protected get fieldDescriptor() {
    if (this.#fieldDescriptor) return this.#fieldDescriptor;
    this.#fieldDescriptor = this.descriptor as FieldDescriptor<TFieldType>;
    const metadata = MetadataProcessor.inferFrom(this.#fieldDescriptor.host!);
    return metadata.field(this.fieldName);
  }

  protected get fieldName() {
    return this.descriptor.name;
  }

  protected get defaultValue() {
    return this.defaultParent?.[this.fieldName];
  }

  protected get class() {
    return this.descriptor.class!;
  }

  protected get defaultParent() {
    return this.#defaultParent as any;
  }

  protected get descriptor() {
    return this.#descriptor;
  }

  abstract test(
    value: any,
    context: any,
    groups?: ValidationGroup[]
  ): [TDetailedResult, TSimpleResult];
}
