import { ValidationGroup } from "../../../decorators/decorator.types";
import {
  ValidationResult,
  buildSimpleErrors,
} from "../../../types/ValidationResult.type";
import { Descriptor } from "../../descriptor/ClassDescriptor";
import ValidationStrategy from "../ValidationStrategy";

type PrimitiveArraySimpleErrors = {
  node: string[];
  children: string[][];
};

type PrimitiveArrayDetailedErrors = {
  node: ValidationResult[];
  children: ValidationResult[][];
};

export default class PrimitiveArrayStrat<F> extends ValidationStrategy<
  F,
  PrimitiveArrayDetailedErrors,
  PrimitiveArraySimpleErrors
> {
  constructor(descriptor: Descriptor<F>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  test(
    value: any[],
    context: any,
    groups: ValidationGroup[] = []
  ): [PrimitiveArrayDetailedErrors, PrimitiveArraySimpleErrors] {
    const valueArray = value ?? [];
    const rootRules = super.fieldDescriptor.rules.root;
    const foreachRules = super.fieldDescriptor.rules.foreach;
    const rootResult = rootRules.validate(valueArray as any, context, groups);

    const primitiveArrayDetailedErrors = {
      node: rootResult,
      children: valueArray.map((v) =>
        foreachRules.validate(v, context, groups)
      ),
    };

    const primitiveArraySimpleErrors = {
      node: buildSimpleErrors(rootResult),
      children: primitiveArrayDetailedErrors.children.map((v) =>
        v.map((r) => r.message)
      ),
    };

    return [primitiveArrayDetailedErrors, primitiveArraySimpleErrors];
  }
}
