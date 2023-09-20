import Validation from "../../../types/namespace/validation.namespace";
import DetailedErrors from "../../../types/validation/detailed-errors.type";
import Errors from "../../../types/validation/errors.type";
import EntityProcessor from "../../models/entity.processor";
import ReflectionDescriptor from "../../models/reflection.descriptor";
import ValidationMetaService from "../../service/impl/reflection.service.validation";
import ValidationStrategy from "../strategy";

type ObjectArraySimpleErrors<F> = {
  node: string[];
  children: Errors<F>[];
};

type ObjectArrayDetailedErrors<F> = {
  node: Validation.Result[];
  children: DetailedErrors<F>[];
};

export default class ObjectArrayStrat<F> extends ValidationStrategy<
  F,
  ObjectArrayDetailedErrors<F>,
  ObjectArraySimpleErrors<F>
> {
  constructor(descriptor: ReflectionDescriptor<F, any>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  test(
    value: any[],
    context: any,
    groups: Validation.Group[] = []
  ): [ObjectArrayDetailedErrors<F>, ObjectArraySimpleErrors<F>] {
    const _value = value ?? [];
    const fieldClass = super.descriptor.thisClass!;
    const metadata = ValidationMetaService.inject(fieldClass);
    const field = metadata.getUntypedDescriptor(super.fieldName);
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
      node: Validation.buildSimpleErrors(rootResult),
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
