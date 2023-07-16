import ValidatorFactory from "../../common/ValidatorFactory";

import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../src/model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../src/model/utility/type.utility";

export type ArraySomeType<T> = {
  test: PredicateType<T>;
};

export default function ArraySome<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArraySomeType<K>>
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySome",
      message: props.message,
      valid: (array ?? []).some(props.test),
    }),
  });
}
