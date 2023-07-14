import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import {
  PredicateType,
  extractGroupsFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../../model/utility/type.utility";

export type ArrayOneType<T> = {
  test: PredicateType<T>;
};

export default function ArrayOne<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayOneType<K>>
) {
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayOne",
      message: props.message,
      valid: (array ?? []).filter(props.test).length === 1,
    }),
  });
}
