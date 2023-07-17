import { makeValidator } from "../../src/decorators/facade/validator.facade";

import { BasicValidatorProviderType } from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";

export type ArrayContainsType<T> = {
  value: T;
};

export default function ArrayContains<K, T extends K[]>(
  props: BasicValidatorProviderType<ArrayContainsType<K>, ArrayContainsType<K>>
) {
  return makeValidator<T>({
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
