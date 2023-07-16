import ValidatorFactory from "../../common/ValidatorFactory";

import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../src/model/utility/object.utility";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../../src/model/utility/type.utility";

export default function NonNegative<T extends Nullable<number>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (num) => ({
      key: "NonNegative",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.NonNegative(num!)
      ),
      valid: num !== undefined && num !== null && num >= 0,
    }),
  });
}
