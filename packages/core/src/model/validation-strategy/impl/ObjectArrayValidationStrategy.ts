import { ValidationGroup } from "../../../decorators/types/DecoratorProps.type";
import { DetailedErrors } from "../../../types/DetailedErrors.type";
import { Errors } from "../../../types/Errors.type";
import { ValidationResult } from "../../../types/ValidationResult.type";
import { Descriptor } from "../../descriptor/ClassDescriptor";
import EntityProcessor from "../../processor/EntityProcessor";
import MetadataProcessor from "../../processor/MetadataProcessor";
import ValidationStrategy from "../ValidationStrategy";

type ObjectArraySimpleErrors<TFieldType> = {
  node: string[];
  children: Errors<TFieldType>[];
};

type ObjectArrayDetailedErrors<TFieldType> = {
  node: ValidationResult[];
  children: DetailedErrors<TFieldType>[];
};

export default class ObjectArrayValidationStrategy<
  TFieldType = any
> extends ValidationStrategy<
  TFieldType,
  ObjectArrayDetailedErrors<TFieldType>,
  ObjectArraySimpleErrors<TFieldType>
> {
  constructor(descriptor: Descriptor<TFieldType>, defaultValue: TFieldType) {
    super(descriptor, defaultValue);
  }

  test(
    value: any[],
    context: any,
    groups: ValidationGroup[] = []
  ): [
    ObjectArrayDetailedErrors<TFieldType>,
    ObjectArraySimpleErrors<TFieldType>
  ] {
    const _value = value ?? [];
    const fieldClass = super.descriptor.class!;
    const fieldName = super.descriptor.name;
    const metadata = MetadataProcessor.inferFrom(fieldClass);
    const field = metadata.field(fieldName);
    const rootRules = field.rules.root;
    const rootResult = rootRules.validate(_value, context, groups);
    const defaultValue = super.default[fieldName];

    const objectArrayDetailedErrors = {
      node: rootResult,
      children: _value.map((v) =>
        new EntityProcessor<TFieldType>(fieldClass, {
          groups,
          defaultValue,
        }).getDetailedErrors(v)
      ),
    };

    const objectArraySimpleErrors = {
      node: rootResult.map((e) => e.message),
      children: _value.map((v) =>
        new EntityProcessor<TFieldType>(fieldClass, {
          groups,
          defaultValue,
        }).getErrors(v)
      ),
    };

    return [objectArrayDetailedErrors, objectArraySimpleErrors];
  }
}
