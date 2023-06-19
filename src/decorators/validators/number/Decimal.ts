import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

export default function Decimal(props?: BasicValidatorProviderType<number>) {
  return ValidatorService.buildFieldValidatorDecorator<number>({
    expectedType: InferredType.NUMBER,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Decimal",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Decimal(value)
      ),
      valid: value !== undefined && value !== null && !Number.isInteger(value),
    }),
  });
}
