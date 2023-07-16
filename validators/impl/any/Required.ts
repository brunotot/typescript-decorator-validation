import ValidatorFactory from "../../common/ValidatorFactory";
import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import { BasicValidatorProviderType } from "../../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
  hasValue,
} from "../../../src/model/utility/object.utility";
import { AcceptableDecoratorFieldType } from "../../../src/model/type/Context.type";

export default function Required<T extends AcceptableDecoratorFieldType>(
  props?: BasicValidatorProviderType
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Required",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Required()),
      valid: hasValue(value),
    }),
  });
}
