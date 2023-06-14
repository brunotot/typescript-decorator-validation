import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import { PredicateType } from "../../../model/utility/object.utility";

export type OneProps<T> = {
  test: PredicateType<T>;
  message: string;
};

export default function One<T>({ test, message }: OneProps<T>) {
  return ValidatorService.buildFieldValidatorDecorator<any[]>({
    expectedType: InferredType.ARRAY,
    isValid: (array) => ({
      key: "One",
      message,
      valid: (array ?? []).filter(test).length === 1,
    }),
  });
}
