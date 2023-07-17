import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";
import Pattern from "./Pattern";

export default function Alpha<T extends Nullable<string>>(
  props?: BasicValidatorProviderType
) {
  return Pattern<T>({
    key: "Alpha",
    regex: /^[a-zA-Z]+$/,
    groups: extractGroupsFromValidatorProps(props),
    message: extractMessageFromValidatorProps(props, ErrorMessage.Alpha()),
  });
}
