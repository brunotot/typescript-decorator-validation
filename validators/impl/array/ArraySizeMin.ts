import ValidatorFactory from "../../common/ValidatorFactory";

import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import { BasicValidatorProviderType } from "../../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../src/model/utility/object.utility";

type ArraySizeMinType = {
  value: number;
};

export default function ArraySizeMin<K, T extends K[]>(
  props: BasicValidatorProviderType<number, ArraySizeMinType>
) {
  const min = typeof props === "number" ? props : props.value;
  return ValidatorFactory.make<T>({
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
