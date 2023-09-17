import { makeValidator } from "../../src/decorators/decorator.facade";
import { ValidationGroupProp } from "../../src/decorators/decorator.types";
import { ValidationEvaluator } from "../../src/types/validation/ValidationEvaluator.type";

export type RuleProps<T> =
  | ValidationEvaluator<T>
  | {
      isValid: ValidationEvaluator<T>;
      groups?: ValidationGroupProp;
    };

export default function Rule<T>(props: RuleProps<T>) {
  return makeValidator<T>({
    isValid: "isValid" in props ? props.isValid : props,
    groups: "isValid" in props ? props.groups : [],
  });
}
