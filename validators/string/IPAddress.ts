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

export default function IPAddress<T extends Nullable<string>>(
  props?: BasicValidatorProviderType
) {
  return Pattern<T>({
    key: "IPAddress",
    groups: extractGroupsFromValidatorProps(props),
    regex:
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    message: extractMessageFromValidatorProps(props, ErrorMessage.IPAddress()),
  });
}
