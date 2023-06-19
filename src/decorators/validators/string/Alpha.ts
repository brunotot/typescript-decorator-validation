import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import Pattern from "./Pattern";

export default function Alpha(props?: BasicValidatorProviderType) {
  return Pattern({
    key: "Alpha",
    regex: /^[a-zA-Z]+$/,
    groups: extractGroupsFromValidatorProps(props),
    message: extractMessageFromValidatorProps(props, ErrorMessage.Alpha()),
  });
}
