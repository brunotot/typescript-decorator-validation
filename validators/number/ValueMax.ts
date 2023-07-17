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

type ValueMaxType = {
  value: number;
};

export default function ValueMax<T extends Nullable<number>>(
  props: BasicValidatorProviderType<number, ValueMaxType>
) {
  const max = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ValueMax",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ValueMax(max, value!)
      ),
      valid: value == null ? true : value <= max,
    }),
  });
}
