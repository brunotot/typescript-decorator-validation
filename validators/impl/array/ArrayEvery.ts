import ValidatorFactory from "../../common/ValidatorFactory";

import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../src/model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../src/model/utility/type.utility";

export type ArrayEveryType<T> = {
  test: PredicateType<T>;
};

export default function ArrayEvery<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayEveryType<K>>
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayEvery",
      message: props.message,
      valid: (array ?? []).every(props.test),
    }),
  });
}
