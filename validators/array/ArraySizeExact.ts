import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { BasicValidatorProviderType } from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";

type ArraySizeExactType = {
  value: number;
};

export default function ArraySizeExact<K, T extends K[]>(
  props: BasicValidatorProviderType<number, ArraySizeExactType>
) {
  const exact = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySizeExact",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArraySizeExact(exact, (array ?? []).length)
      ),
      valid: (array ?? []).length === exact,
    }),
  });
}
