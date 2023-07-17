import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";

export default function Integer<T extends Nullable<number>>(
  props?: BasicValidatorProviderType
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (num) => ({
      key: "Integer",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Integer(num!)
      ),
      valid: num !== undefined && num !== null && Number.isInteger(num),
    }),
  });
}
