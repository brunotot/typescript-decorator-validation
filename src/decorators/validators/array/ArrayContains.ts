import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ErrorMessage from "../../../model/messages/ErrorMessage";

export type ArrayContainsType<T> = {
  value: T;
};

export default function ArrayContains<T>(
  props: BasicValidatorProviderType<ArrayContainsType<T>, ArrayContainsType<T>>
) {
  return ValidatorService.buildFieldValidatorDecorator<T[]>({
    expectedType: InferredType.ARRAY,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayContains",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArrayContains(props.value)
      ),
      valid: (array ?? []).includes(props.value),
    }),
  });
}
