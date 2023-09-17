import Validation from "../../../types/namespace/validation.namespace";
import DetailedErrors from "../../../types/validation/detailed-errors.type";
import Errors from "../../../types/validation/errors.type";
import EntityProcessor from "../../models/entity.processor";
import ReflectionDescriptor from "../../models/reflection.descriptor";
import ValidationStrategy from "../strategy";

type ObjectSimpleErrors<F> = {
  node: string[];
  children: Errors<F>;
};

type ObjectDetailedErrors<F> = {
  node: Validation.Result[];
  children: DetailedErrors<F>;
};

export default class ObjectStrat<F> extends ValidationStrategy<
  F,
  ObjectDetailedErrors<F>,
  ObjectSimpleErrors<F>
> {
  constructor(descriptor: ReflectionDescriptor<F, any>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  test(
    value: any,
    context: any,
    groups: Validation.Group[] = []
  ): [ObjectDetailedErrors<F>, ObjectSimpleErrors<F>] {
    const { detailedErrors, errors } = new EntityProcessor<F>(
      super.descriptor.thisClass!,
      super.getEntityProcessorConfig(groups)
    ).validate(value);

    const rootResult = super.fieldDescriptor!.rules.root.validate(
      value,
      context,
      groups
    );

    const detailedErrorsResult: ObjectDetailedErrors<F> = {
      node: rootResult,
      children: detailedErrors,
    };

    const errorsResult: ObjectSimpleErrors<F> = {
      node: Validation.buildSimpleErrors(rootResult),
      children: errors,
    };

    return [detailedErrorsResult, errorsResult];
  }
}
