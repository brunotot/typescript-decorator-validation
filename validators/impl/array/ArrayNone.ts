import ValidatorFactory from "../../common/ValidatorFactory";

import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../src/model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../src/model/utility/type.utility";

export type ArrayNoneType<T> = {
  test: PredicateType<T>;
};

export default function ArrayNone<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayNoneType<K>>
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayNone",
      message: props.message,
      valid: !(array ?? []).some(props.test),
    }),
  });
}
