import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../model/utility/type.utility";

export type ArrayNoneType<T> = {
  test: PredicateType<T>;
};

export default function ArrayNone<T>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayNoneType<T>>
) {
  return ValidatorService.buildFieldValidatorDecorator<any[]>({
    expectedType: InferredType.ARRAY,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayNone",
      message: props.message,
      valid: !(array ?? []).some(props.test),
    }),
  });
}
