import ValidatorFactory from "../../common/ValidatorFactory";

import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import { extractMessageFromValidatorProps } from "../../../src/model/utility/object.utility";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../../src/model/utility/type.utility";

export default function NonPositive<T extends Nullable<number>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorFactory.make<T>({
    isValid: (num) => ({
      key: "NonPositive",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.NonPositive(num!)
      ),
      valid: num !== undefined && num !== null && num <= 0,
    }),
  });
}
