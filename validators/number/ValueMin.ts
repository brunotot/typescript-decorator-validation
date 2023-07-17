import { makeValidator } from "../../src/decorators/facade/validator.facade";

import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";

type ValueMinType = {
  value: number;
};

export default function ValueMin<T extends Nullable<number>>(
  props: BasicValidatorProviderType<number, ValueMinType>
) {
  const min = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ValueMin",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ValueMin(min, value!)
      ),
      valid: value == null ? true : value >= min,
    }),
  });
}
