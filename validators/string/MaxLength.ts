import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";

type MaxLengthType = {
  value: number;
};

export default function MaxLength<T extends Nullable<string>>(
  props: BasicValidatorProviderType<number, MaxLengthType>
) {
  const max = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
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
