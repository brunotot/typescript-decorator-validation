import Validation from "../../../types/namespace/validation.namespace";
import ReflectionDescriptor from "../../models/reflection.descriptor";
import ValidationStrategy from "../strategy";

export default class PrimitiveStrat<F> extends ValidationStrategy<
  F,
  Validation.Result[],
  string[]
> {
  constructor(descriptor: ReflectionDescriptor<F, any>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  test(
    value: any,
    context: any,
    groups: Validation.Group[] = []
  ): [Validation.Result[], string[]] {
    const rootResult = this.fieldDescriptor!.rules.root.validate(
      value,
      context,
      groups
    );

    return [rootResult, Validation.buildSimpleErrors(rootResult)];
  }
}
