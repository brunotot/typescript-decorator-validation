import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../src/model/utility/object.utility";
import ValidatorFactory from "../../common/ValidatorFactory";

export default function Falsy<T extends Nullable>(
  props?: BasicValidatorProviderType
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Falsy",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Falsy()),
      valid: !value,
    }),
  });
}
