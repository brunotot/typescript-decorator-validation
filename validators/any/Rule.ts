import { ValidationGroupParamType } from "../../src/model/utility/type.utility";
import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { ValidationFn } from "../../src/processor/EntityProcessor";

export type RuleProps<T> =
  | ValidationFn<T>
  | {
      isValid: ValidationFn<T>;
      groups?: ValidationGroupParamType;
    };

export default function Rule<T>(props: RuleProps<T>) {
  return makeValidator<T>({
    isValid: "isValid" in props ? props.isValid : props,
    groups: "isValid" in props ? props.groups : [],
  });
}
