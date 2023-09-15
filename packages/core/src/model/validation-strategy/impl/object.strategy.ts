import { ValidationGroup } from "../../../decorators/decorator.types";
import { DetailedErrors } from "../../../types/DetailedErrors.type";
import { Errors } from "../../../types/Errors.type";
import {
  ValidationResult,
  buildSimpleErrors,
} from "../../../types/ValidationResult.type";
import { Descriptor } from "../../descriptor/class.descriptor";
import EntityProcessor from "../../processor/entity.processor";
import ValidationStrategy from "../strategy";

type ObjectSimpleErrors<F> = {
  node: string[];
  children: Errors<F>;
};

type ObjectDetailedErrors<F> = {
  node: ValidationResult[];
  children: DetailedErrors<F>;
};

export default class ObjectStrat<F> extends ValidationStrategy<
  F,
  ObjectDetailedErrors<F>,
  ObjectSimpleErrors<F>
> {
  constructor(descriptor: Descriptor<F>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  test(
    value: any,
    context: any,
    groups: ValidationGroup[] = []
  ): [ObjectDetailedErrors<F>, ObjectSimpleErrors<F>] {
    const { detailedErrors, errors } = new EntityProcessor<F>(
      super.class,
      super.getEntityProcessorConfig(groups)
    ).validate(value);

    const rootResult = super.fieldDescriptor.rules.root.validate(
      value,
      context,
      groups
    );

    const detailedErrorsResult: ObjectDetailedErrors<F> = {
      node: rootResult,
      children: detailedErrors,
    };

    const errorsResult: ObjectSimpleErrors<F> = {
      node: buildSimpleErrors(rootResult),
      children: errors,
    };

    return [detailedErrorsResult, errorsResult];
  }
}
