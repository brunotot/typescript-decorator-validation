import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

export default function ArrayEmpty<T>(props?: BasicValidatorProviderType) {
  return ValidatorService.buildFieldValidatorDecorator<any[]>({
    expectedType: InferredType.ARRAY,
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
