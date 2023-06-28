import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ErrorMessage from "../../../model/messages/ErrorMessage";

export type ArrayContainsType<T> = {
  value: T;
};

export default function ArrayContains<K, T extends NullableType<K[]>>(
  props: BasicValidatorProviderType<ArrayContainsType<K>, ArrayContainsType<K>>
) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayContains",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArrayContains(props.value)
      ),
      valid: ((array ?? []) as any[]).includes(props.value),
    }),
  });
}
