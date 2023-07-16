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

export default function Positive<T extends Nullable<number>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (num) => ({
      key: "Positive",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Positive(num!)
      ),
      valid: num !== undefined && num !== null && num > 0,
    }),
  });
}
