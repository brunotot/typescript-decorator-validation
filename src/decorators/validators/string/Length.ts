import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type LengthType = {
  min: number;
  max: number;
};

export default function Length<T>(
  props: BasicValidatorProviderType<LengthType, LengthType>
) {
  const { min, max } = props;
  return ValidatorService.buildFieldValidatorDecorator<T[]>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Length",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.RangeLength(min, max)
      ),
      valid: (value ?? "").length >= min && (value ?? "").length <= max,
    }),
  });
}
