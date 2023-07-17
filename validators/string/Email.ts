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

export default function Email<T extends Nullable<string>>(
  props?: BasicValidatorProviderType
) {
  return Pattern<T>({
    key: "Email",
    groups: extractGroupsFromValidatorProps(props),
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: extractMessageFromValidatorProps(props, ErrorMessage.Email()),
  });
}
