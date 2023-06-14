import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";

export type ContainsProps<T> = {
  element: T;
  message: string;
};

export default function Contains<T>({ element, message }: ContainsProps<T>) {
  return ValidatorService.buildFieldValidatorDecorator<T[]>({
    expectedType: InferredType.ARRAY,
    isValid: (array) => ({
      key: "Contains",
      message,
      valid: (array ?? []).includes(element),
    }),
  });
}
