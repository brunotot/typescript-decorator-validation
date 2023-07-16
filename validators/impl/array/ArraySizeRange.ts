import ValidatorFactory from "../../common/ValidatorFactory";

import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import { BasicValidatorProviderType } from "../../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../src/model/utility/object.utility";

type ArraySizeRangeType = {
  min: number;
  max: number;
};

export default function ArraySizeRange<K, T extends K[]>(
  props: BasicValidatorProviderType<ArraySizeRangeType, ArraySizeRangeType>
) {
  const min = typeof props === "number" ? props : props.min;
  const max = typeof props === "number" ? props : props.max;
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySizeRange",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArraySizeRange(min, max, (array ?? []).length)
      ),
      valid: (array ?? []).length >= min && (array ?? []).length <= max,
    }),
  });
}
