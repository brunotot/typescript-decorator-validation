import Validation from "../../../types/namespace/validation.namespace";
import ReflectionDescriptor from "../../models/reflection.descriptor";
import ValidationStrategy from "../strategy";

type PrimitiveArraySimpleErrors = {
  node: string[];
  children: string[][];
};

type PrimitiveArrayDetailedErrors = {
  node: Validation.Result[];
  children: Validation.Result[][];
};

export default class PrimitiveArrayStrat<F> extends ValidationStrategy<
  F,
  PrimitiveArrayDetailedErrors,
  PrimitiveArraySimpleErrors
> {
  constructor(descriptor: ReflectionDescriptor<F, any>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  test(
    value: any[],
    context: any,
    groups: Validation.Group[] = []
  ): [PrimitiveArrayDetailedErrors, PrimitiveArraySimpleErrors] {
    const valueArray = value ?? [];
    const rootRules = super.fieldDescriptor!.rules.root;
    const foreachRules = super.fieldDescriptor!.rules.foreach;
    const rootResult = rootRules.validate(valueArray as any, context, groups);

    const primitiveArrayDetailedErrors = {
      node: rootResult,
      children: valueArray.map((v) =>
        foreachRules.validate(v, context, groups)
      ),
    };

    const primitiveArraySimpleErrors = {
      node: Validation.buildSimpleErrors(rootResult),
      children: primitiveArrayDetailedErrors.children.map((v) =>
        v.map((r) => r.message)
      ),
    };

    return [primitiveArrayDetailedErrors, primitiveArraySimpleErrors];
  }
}
