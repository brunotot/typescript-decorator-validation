import { ValidationGroup } from "../../../decorators/decorator.types";
import { DetailedErrors } from "../../../types/DetailedErrors.type";
import { Errors } from "../../../types/Errors.type";
import {
  ValidationResult,
  buildSimpleErrors,
} from "../../../types/ValidationResult.type";
import { Descriptor } from "../../descriptor/ClassDescriptor";
import EntityProcessor from "../../processor/EntityProcessor";
import MetadataProcessor from "../../processor/MetadataProcessor";
import ValidationStrategy from "../ValidationStrategy";

type ObjectArraySimpleErrors<F> = {
  node: string[];
  children: Errors<F>[];
};

type ObjectArrayDetailedErrors<F> = {
  node: ValidationResult[];
  children: DetailedErrors<F>[];
};

export default class ObjectArrayStrat<F> extends ValidationStrategy<
  F,
  ObjectArrayDetailedErrors<F>,
  ObjectArraySimpleErrors<F>
> {
  constructor(descriptor: Descriptor<F>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  test(
    value: any[],
    context: any,
    groups: ValidationGroup[] = []
  ): [ObjectArrayDetailedErrors<F>, ObjectArraySimpleErrors<F>] {
    const _value = value ?? [];
    const fieldClass = super.descriptor.class!;
    const metadata = MetadataProcessor.inferFrom(fieldClass);
    const field = metadata.field(super.descriptor.name);
    const rootResult = field.rules.root.validate(_value, context, groups);

    const objectArrayDetailedErrors = {
      node: rootResult,
      children: _value.map((v) =>
        new EntityProcessor<F>(
          fieldClass,
          super.getEntityProcessorConfig(groups)
        ).getDetailedErrors(v)
      ),
    };

    const objectArraySimpleErrors = {
      node: buildSimpleErrors(rootResult),
      children: _value.map((v) =>
        new EntityProcessor<F>(
          fieldClass,
          super.getEntityProcessorConfig(groups)
        ).getErrors(v)
      ),
    };

    return [objectArrayDetailedErrors, objectArraySimpleErrors];
  }
}
