import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../model/utility/type.utility";

export type ArrayNoneType<T> = {
  test: PredicateType<T>;
};

export default function ArrayNone<K, T extends NullableType<K[]>>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayNoneType<K>>
) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayNone",
      message: props.message,
      valid: !(array ?? []).some(props.test),
    }),
  });
}
