import { ValidationGroupProp } from "../../src/decorators/types/DecoratorProps.type";
import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { ValidationEvaluator } from "../../src/types/ValidationEvaluator.type";

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
