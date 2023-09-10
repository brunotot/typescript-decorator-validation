import { ValidationGroup } from "../../../decorators/types/DecoratorProps.type";
import { DetailedErrors } from "../../../types/DetailedErrors.type";
import { Errors } from "../../../types/Errors.type";
import { ValidationResult } from "../../../types/ValidationResult.type";
import { Descriptor } from "../../descriptor/ClassDescriptor";
import EntityProcessor from "../../processor/EntityProcessor";
import MetadataProcessor from "../../processor/MetadataProcessor";
import ValidationStrategy from "../ValidationStrategy";

type ObjectSimpleErrors<TFieldType> = {
  node: string[];
  children: Errors<TFieldType>;
};

type ObjectDetailedErrors<TFieldType> = {
  node: ValidationResult[];
  children: DetailedErrors<TFieldType>;
};

export default class ObjectValidationStrategy<
  TFieldType = any
> extends ValidationStrategy<
  TFieldType,
  ObjectDetailedErrors<TFieldType>,
  ObjectSimpleErrors<TFieldType>
> {
  constructor(descriptor: Descriptor<TFieldType>, defaultValue: TFieldType) {
    super(descriptor, defaultValue);
  }

  test(
    value: any,
    context: any,
    groups: ValidationGroup[] = []
  ): [ObjectDetailedErrors<TFieldType>, ObjectSimpleErrors<TFieldType>] {
    const fieldClass = super.descriptor.class!;
    const defaultParent: any = super.default;
    const fieldName = super.descriptor.name;
    const defaultValue: any = defaultParent?.[fieldName];
    const procCfg = { defaultValue, groups };
    const nested = new EntityProcessor<TFieldType>(fieldClass, procCfg);
    const metadata = MetadataProcessor.inferFrom(fieldClass);
    const field = metadata.field(fieldName);
    const rootRules = field.rules.root;
    const { detailedErrors, errors } = nested.validate(value);
    const rootResult = rootRules.validate(value, context, groups);

    const objectDetailedErrors = {
      node: rootResult,
      children: detailedErrors,
    };

    const objectSimpleErrors = {
      node: rootResult.map((e) => e.message),
      children: errors,
    };

    return [objectDetailedErrors, objectSimpleErrors];
  }
}
