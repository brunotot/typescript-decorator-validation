import { ValidationGroup } from "../../../decorators/types/DecoratorProps.type";
import { ValidationResult } from "../../../types/ValidationResult.type";
import { Descriptor } from "../../descriptor/ClassDescriptor";
import FieldDescriptor from "../../descriptor/FieldDescriptor";
import MetadataProcessor from "../../processor/MetadataProcessor";
import ValidationStrategy from "../ValidationStrategy";

type PrimitiveArraySimpleErrors = {
  node: string[];
  children: string[][];
};

type PrimitiveArrayDetailedErrors = {
  node: ValidationResult[];
  children: ValidationResult[][];
};

export default class PrimitiveArrayValidationStrategy<
  TFieldType = any
> extends ValidationStrategy<
  TFieldType,
  PrimitiveArrayDetailedErrors,
  PrimitiveArraySimpleErrors
> {
  constructor(descriptor: Descriptor<TFieldType>, defaultValue: TFieldType) {
    super(descriptor, defaultValue);
  }

  get #descriptor() {
    return this.descriptor as FieldDescriptor<TFieldType>;
  }

  test(
    value: any[],
    context: any,
    groups: ValidationGroup[] = []
  ): [PrimitiveArrayDetailedErrors, PrimitiveArraySimpleErrors] {
    const _value = value ?? [];
    const fieldName = super.descriptor.name;
    const metadata = MetadataProcessor.inferFrom(this.#descriptor.host!);
    const field = metadata.field(fieldName);
    const rootRules = field.rules.root;
    const foreachRules = field.rules.foreach;
    const rootResult = rootRules.validate(_value, context, groups);

    const primitiveArrayDetailedErrors = {
      node: rootResult,
      children: _value.map((v) => foreachRules.validate(v, context, groups)),
    };

    const primitiveArraySimpleErrors = {
      node: rootResult.map((e) => e.message),
      children: primitiveArrayDetailedErrors.children.map((v) =>
        v.map((r) => r.message)
      ),
    };

    return [primitiveArrayDetailedErrors, primitiveArraySimpleErrors];
  }
}
