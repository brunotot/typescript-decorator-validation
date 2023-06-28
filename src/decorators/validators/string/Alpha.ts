import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import { NullableType } from "../../../service/ValidatorService";
import Pattern from "./Pattern";

export default function Alpha<T extends NullableType<string>>(
  props?: BasicValidatorProviderType
) {
  return Pattern<T>({
    key: "Alpha",
    regex: /^[a-zA-Z]+$/,
    groups: extractGroupsFromValidatorProps(props),
    message: extractMessageFromValidatorProps(props, ErrorMessage.Alpha()),
  });
}
