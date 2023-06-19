import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import Pattern from "./Pattern";

export default function URL(props?: BasicValidatorProviderType) {
  return Pattern({
    key: "URL",
    message: extractMessageFromValidatorProps(props, ErrorMessage.URL()),
    groups: extractGroupsFromValidatorProps(props),
    regex:
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  });
}
