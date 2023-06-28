import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../model/utility/type.utility";

export type ArraySomeType<T> = {
  test: PredicateType<T>;
};

export default function ArraySome<K, T extends NullableType<K[]>>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArraySomeType<K>>
) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySome",
      message: props.message,
      valid: (array ?? []).some(props.test),
    }),
  });
}
