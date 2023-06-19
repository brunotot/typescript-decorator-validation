import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../model/utility/type.utility";

export type ArrayEveryType<T> = {
  test: PredicateType<T>;
};

export default function ArrayEvery<T>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayEveryType<T>>
) {
  return ValidatorService.buildFieldValidatorDecorator<any[]>({
    expectedType: InferredType.ARRAY,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayEvery",
      message: props.message,
      valid: (array ?? []).every(props.test),
    }),
  });
}
