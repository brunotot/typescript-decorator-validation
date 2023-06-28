import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type ArraySizeExactType = {
  value: number;
};

export default function ArraySizeExact<K, T extends NullableType<K[]>>(
  props: BasicValidatorProviderType<number, ArraySizeExactType>
) {
  const exact = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<T>({
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
