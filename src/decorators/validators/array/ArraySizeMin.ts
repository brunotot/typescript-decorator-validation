import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type ArraySizeMinType = {
  value: number;
};

export default function ArraySizeMin<K, T extends Nullable<K[]>>(
  props: BasicValidatorProviderType<number, ArraySizeMinType>
) {
  const min = typeof props === "number" ? props : props.value;
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySizeMin",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArraySizeMin(min, (array ?? []).length)
      ),
      valid: (array ?? []).length >= min,
    }),
  });
}
