import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { BasicValidatorProviderType } from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";

type ArraySizeMaxType = {
  value: number;
};

export default function ArraySizeMax<K, T extends K[]>(
  props: BasicValidatorProviderType<number, ArraySizeMaxType>
) {
  const max = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySizeMax",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArraySizeMax(max, (array ?? []).length)
      ),
      valid: (array ?? []).length <= max,
    }),
  });
}
