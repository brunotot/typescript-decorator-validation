import { ValidationFn } from "../../../src/processor/EntityProcessor";
import { ValidationGroupParamType } from "../../../src/model/utility/type.utility";
import ValidatorFactory from "../../common/ValidatorFactory";

export type RuleProps<T> =
  | ValidationFn<T>
  | {
      isValid: ValidationFn<T>;
      groups?: ValidationGroupParamType;
    };

export default function Rule<T>(props: RuleProps<T>) {
  return ValidatorFactory.make<T>({
    isValid: "isValid" in props ? props.isValid : props,
    groups: "isValid" in props ? props.groups : [],
  });
}
