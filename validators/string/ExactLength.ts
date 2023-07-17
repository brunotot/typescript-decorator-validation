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

type ExactLengthType = {
  value: number;
};

export default function ExactLength<T extends Nullable<string>>(
  props: BasicValidatorProviderType<number, ExactLengthType>
) {
  const exact = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
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
