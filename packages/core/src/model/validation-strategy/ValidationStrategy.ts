import { ValidationGroup } from "../../decorators/types/DecoratorProps.type";
import { Class } from "../../types/Class.type";
import { Descriptor } from "../descriptor/ClassDescriptor";
import FieldDescriptor, {
  PropertyTypeGroup,
} from "../descriptor/FieldDescriptor";
import { EntityProcessorConfig } from "../processor/EntityProcessor";
import MetadataProcessor from "../processor/MetadataProcessor";

type StrategyMapperType = Record<PropertyTypeGroup, Class<ValidationStrategy>>;

const strategyMapper: StrategyMapperType = {} as any;

export function getStrategyMapper(
  strategy: PropertyTypeGroup
): Class<ValidationStrategy> {
  return strategyMapper[strategy];
}

export function registerStrategy(
  strategyClassImplementation: Class<ValidationStrategy>,
  strategyName: PropertyTypeGroup
) {
  strategyMapper[strategyName] = strategyClassImplementation;
  return strategyClassImplementation;
}

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
