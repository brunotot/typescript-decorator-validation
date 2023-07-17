import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";

export default function Decimal<T extends Nullable<number>>(
  props?: BasicValidatorProviderType<number>
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Decimal",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Decimal(value!)
      ),
      valid: value !== undefined && value !== null && !Number.isInteger(value),
    }),
  });
}
