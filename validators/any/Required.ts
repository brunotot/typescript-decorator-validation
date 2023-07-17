import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
  hasValue,
} from "../../src/model/utility/object.utility";
import { makeValidator } from "../../src/decorators/facade/validator.facade";

export default function Required<T extends Nullable>(
  props?: BasicValidatorProviderType
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Required",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Required()),
      valid: hasValue(value),
    }),
  });
}
