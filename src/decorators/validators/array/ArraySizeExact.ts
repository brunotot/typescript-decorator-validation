import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type ArraySizeExactType = {
  value: number;
};

export default function ArraySizeExact<T>(
  props: BasicValidatorProviderType<number, ArraySizeExactType>
) {
  const exact = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<T[]>({
    expectedType: InferredType.ARRAY,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySizeExact",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArraySizeExact(exact, (array ?? []).length)
      ),
      valid: (array ?? []).length === exact,
    }),
  });
}
