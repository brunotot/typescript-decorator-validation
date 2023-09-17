import { ValidationGroup } from "../../../decorators/decorator.types";
import {
  ValidationResult,
  buildSimpleErrors,
} from "../../../types/validation/ValidationResult.type";
import ReflectionDescriptor from "../../models/reflection.descriptor";
import ValidationStrategy from "../strategy";

export default class PrimitiveStrat<F> extends ValidationStrategy<
  F,
  ValidationResult[],
  string[]
> {
  constructor(descriptor: ReflectionDescriptor<F, any>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  test(
    value: any,
    context: any,
    groups: ValidationGroup[] = []
  ): [ValidationResult[], string[]] {
    const rootResult = this.fieldDescriptor!.rules.root.validate(
      value,
      context,
      groups
    );
    return [rootResult, buildSimpleErrors(rootResult)];
  }
}
