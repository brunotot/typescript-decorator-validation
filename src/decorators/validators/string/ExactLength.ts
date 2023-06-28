import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type ExactLengthType = {
  value: number;
};

export default function ExactLength<T extends NullableType<string>>(
  props: BasicValidatorProviderType<number, ExactLengthType>
) {
  const exact = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ExactLength",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ExactLength(exact)
      ),
      valid: (value ?? "").length === exact,
    }),
  });
}
