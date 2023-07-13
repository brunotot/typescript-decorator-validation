import ValidatorService, { Nullable } from "../../../service/ValidatorService";

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

export default function Length<T extends Nullable<string>>(
  props: BasicValidatorProviderType<LengthType, LengthType>
) {
  const { min, max } = props;
  return ValidatorService.validatorDecoratorFactory<T>({
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
