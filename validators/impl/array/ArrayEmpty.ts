import ValidatorFactory from "../../common/ValidatorFactory";

import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import { BasicValidatorProviderType } from "../../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../src/model/utility/object.utility";

export default function ArrayEmpty<K, T extends K[]>(
  props?: BasicValidatorProviderType
) {
  return ValidatorFactory.make<T>({
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
