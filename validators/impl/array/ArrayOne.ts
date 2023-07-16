import ValidatorFactory from "../../common/ValidatorFactory";

import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../src/model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../src/model/utility/type.utility";

export type ArrayOneType<T> = {
  test: PredicateType<T>;
};

export default function ArrayOne<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayOneType<K>>
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayOne",
      message: props.message,
      valid: (array ?? []).filter(props.test).length === 1,
    }),
  });
}
