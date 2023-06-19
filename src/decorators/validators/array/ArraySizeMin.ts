import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type ArraySizeMinType = {
  value: number;
};

export default function ArraySizeMin<T>(
  props: BasicValidatorProviderType<number, ArraySizeMinType>
) {
  const min = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<T[]>({
    expectedType: InferredType.ARRAY,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySizeMin",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArraySizeMin(min, (array ?? []).length)
      ),
      valid: (array ?? []).length >= min,
    }),
  });
}
