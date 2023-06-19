import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../model/utility/type.utility";

export type ArraySomeType<T> = {
  test: PredicateType<T>;
};

export default function ArraySome<T>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArraySomeType<T>>
) {
  return ValidatorService.buildFieldValidatorDecorator<any[]>({
    expectedType: InferredType.ARRAY,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySome",
      message: props.message,
      valid: (array ?? []).some(props.test),
    }),
  });
}
