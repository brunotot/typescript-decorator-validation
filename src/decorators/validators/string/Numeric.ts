import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import Pattern from "./Pattern";

export default function Numeric(props?: BasicValidatorProviderType) {
  return Pattern({
    key: "Numeric",
    regex: /^[0-9]+$/,
    groups: extractGroupsFromValidatorProps(props),
    message: extractMessageFromValidatorProps(props, ErrorMessage.Numeric()),
  });
}
