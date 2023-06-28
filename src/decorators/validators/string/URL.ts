import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import { NullableType } from "../../../service/ValidatorService";
import Pattern from "./Pattern";

export default function URL<T extends NullableType<string>>(
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
