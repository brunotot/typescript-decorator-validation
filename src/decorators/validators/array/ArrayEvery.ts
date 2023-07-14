import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../model/utility/type.utility";

export type ArrayEveryType<T> = {
  test: PredicateType<T>;
};

export default function ArrayEvery<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayEveryType<K>>
) {
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayEvery",
      message: props.message,
      valid: (array ?? []).every(props.test),
    }),
  });
}
