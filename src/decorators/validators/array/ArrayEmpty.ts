import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

export default function ArrayEmpty<K, T extends NullableType<K[]>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
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
