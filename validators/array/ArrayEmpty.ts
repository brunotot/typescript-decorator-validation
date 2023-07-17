import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { BasicValidatorProviderType } from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";

export default function ArrayEmpty<K, T extends K[]>(
  props?: BasicValidatorProviderType
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayEmpty",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArrayEmpty()
      ),
      valid: (array ?? []).length === 0,
    }),
  });
}
