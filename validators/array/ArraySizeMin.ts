import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { BasicValidatorProviderType } from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";

type ArraySizeMinType = {
  value: number;
};

export default function ArraySizeMin<K, T extends K[]>(
  props: BasicValidatorProviderType<number, ArraySizeMinType>
) {
  const min = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySizeMin",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArraySizeMin(min, (array ?? []).length)
      ),
      valid: (array ?? []).length >= min,
    }),
  });
}
