import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../src/model/utility/object.utility";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../../src/model/utility/type.utility";
import Pattern from "./Pattern";

export default function URL<T extends Nullable<string>>(
  props?: BasicValidatorProviderType
) {
  return Pattern<T>({
    key: "URL",
    message: extractMessageFromValidatorProps(props, ErrorMessage.URL()),
    groups: extractGroupsFromValidatorProps(props),
    regex:
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  });
}
