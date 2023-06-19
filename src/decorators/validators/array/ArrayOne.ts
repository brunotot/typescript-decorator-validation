import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../model/utility/type.utility";

export type ArrayOneType<T> = {
  test: PredicateType<T>;
};

export default function ArrayOne<T>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayOneType<T>>
) {
  return ValidatorService.buildFieldValidatorDecorator<any[]>({
    expectedType: InferredType.ARRAY,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayOne",
      message: props.message,
      valid: (array ?? []).filter(props.test).length === 1,
    }),
  });
}
