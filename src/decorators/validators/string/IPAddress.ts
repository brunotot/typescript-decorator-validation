import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import { NullableType } from "../../../service/ValidatorService";
import Pattern from "./Pattern";

export default function IPAddress<T extends NullableType<string>>(
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
