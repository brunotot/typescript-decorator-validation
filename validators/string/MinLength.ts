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

type MinLengthType = {
  value: number;
};

export default function MinLength<T extends Nullable<string>>(
  props: BasicValidatorProviderType<number, MinLengthType>
) {
  const min = typeof props === "number" ? props : props.value;
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "MinLength",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.MinLength(min)
      ),
      valid: (value ?? "").length >= min,
    }),
  });
}
