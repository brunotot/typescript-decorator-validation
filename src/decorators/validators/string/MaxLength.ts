import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type MaxLengthType = {
  value: number;
};

export default function MaxLength<T extends Nullable<string>>(
  props: BasicValidatorProviderType<number, MaxLengthType>
) {
  const max = typeof props === "number" ? props : props.value;
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "MaxLength",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.MaxLength(max)
      ),
      valid: (value ?? "").length <= max,
    }),
  });
}
