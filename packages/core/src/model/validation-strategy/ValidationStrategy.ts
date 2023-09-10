import { ValidationGroup } from "../../decorators/types/DecoratorProps.type";
import { Descriptor } from "../descriptor/ClassDescriptor";

export default abstract class ValidationStrategy<
  TFieldType = any,
  TDetailedResult = any,
  TSimpleResult = any
> {
  #descriptor: Descriptor<TFieldType>;
  #default: TFieldType;

  protected get class() {
    return this.descriptor.class!;
  }

  protected get default() {
    return this.#default as any;
  }

  protected get descriptor() {
    return this.#descriptor;
  }

  constructor(descriptor: Descriptor<TFieldType>, defaultValue: TFieldType) {
    this.#descriptor = descriptor;
    this.#default = defaultValue;
  }

  // prettier-ignore
  abstract test(value: any, context: any, groups?: ValidationGroup[]): [TDetailedResult, TSimpleResult];
}
