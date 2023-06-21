import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type ArraySizeMaxType = {
  value: number;
};

export default function ArraySizeMax<T>(
  props: BasicValidatorProviderType<number, ArraySizeMaxType>
) {
  const max = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<T[]>({
    expectedType: InferredType.ARRAY,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySizeMax",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArraySizeMax(max, (array ?? []).length)
      ),
      valid: (array ?? []).length <= max,
    }),
  });
}