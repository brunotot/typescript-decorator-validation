import { ValidationFn } from "../../../handler/ValidationHandler";
import { ValidationGroupParamType } from "../../../model/utility/type.utility";
import ValidatorService from "../../../service/ValidatorService";

export type RuleProps<T> =
  | ValidationFn<T>
  | {
      isValid: ValidationFn<T>;
      groups?: ValidationGroupParamType;
    };

export default function Rule<T>(props: RuleProps<T>) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
    isValid: "isValid" in props ? props.isValid : props,
    groups: "isValid" in props ? props.groups : [],
  });
}
