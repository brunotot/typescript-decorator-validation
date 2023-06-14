import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import { PredicateType } from "../../../model/utility/object.utility";

export type SomeProps<T> = {
  test: PredicateType<T>;
  message: string;
};

export default function Some<T>({ test, message }: SomeProps<T>) {
  return ValidatorService.buildFieldValidatorDecorator<any[]>({
    expectedType: InferredType.ARRAY,
    isValid: (array) => ({
      key: "Some",
      message,
      valid: (array ?? []).some(test),
    }),
  });
}
