import { ValidationGroup } from "../../decorators/decorator.types";
import { Descriptor } from "../../model/descriptor/class.descriptor";
import {
  ValidationResult,
  buildSimpleErrors,
} from "../../types/ValidationResult.type";
import ValidationStrategy from "../strategy";

export default class PrimitiveStrat<F> extends ValidationStrategy<
  F,
  ValidationResult[],
  string[]
> {
  constructor(descriptor: Descriptor<F>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  test(
    value: any,
    context: any,
    groups: ValidationGroup[] = []
  ): [ValidationResult[], string[]] {
    const rootResult = super.fieldDescriptor.rules.root.validate(
      value,
      context,
      groups
    );
    return [rootResult, buildSimpleErrors(rootResult)];
  }
}
