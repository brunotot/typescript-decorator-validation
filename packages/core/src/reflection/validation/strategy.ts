import { ValidationGroup } from "../../decorators/decorator.types";
import { EntityProcessorConfig } from "../models/entity.processor";
import ReflectionDescriptor from "../models/reflection.descriptor";
import ValidationMetaService from "../service/impl/reflection.service.validation";

export default abstract class ValidationStrategy<
  TFieldType = any,
  TDetailedResult = any,
  TSimpleResult = any
> {
  #descriptor: ReflectionDescriptor<any, any>;
  #defaultParent: TFieldType;
  #fieldDescriptor?: ReflectionDescriptor<TFieldType, any>;

  constructor(
    descriptor: ReflectionDescriptor<TFieldType, any>,
    defaultValue: TFieldType
  ) {
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
    this.#fieldDescriptor = ValidationMetaService.inject(
      this.descriptor.hostClass!
    ).descriptor(this.fieldName) as any;
    return this.#fieldDescriptor;
  }

  protected get fieldName() {
    return this.descriptor.thisName!;
  }

  protected get defaultValue() {
    return this.defaultParent?.[this.fieldName];
  }

  protected get class() {
    return this.descriptor.hostClass!;
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
