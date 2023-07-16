import ValidatorFactory from "../../common/ValidatorFactory";

import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../src/model/utility/object.utility";

type LengthType = {
  min: number;
  max: number;
};

export default function Length<T extends Nullable<string>>(
  props: BasicValidatorProviderType<LengthType, LengthType>
) {
  const { min, max } = props;
  return ValidatorFactory.make<T>({
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
