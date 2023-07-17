import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";
import { makeValidator } from "../../src/decorators/facade/validator.facade";

export default function Falsy<T extends Nullable>(
  props?: BasicValidatorProviderType
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Falsy",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Falsy()),
      valid: !value,
    }),
  });
}
