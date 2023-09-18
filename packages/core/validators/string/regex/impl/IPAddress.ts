import {
  extractGroups,
  extractMessage,
} from "../../../../src/decorators/decorator.utils";
import ErrorMessage from "../../../../src/messages/models/errors";
import RegexConst from "../../../../src/models/regex.constants";
import $ from "../../../../src/types";
import Decorator from "../../../../src/types/namespace/decorator.namespace";
import Pattern from "./../../regex/Pattern";

export default function IPAddress<T extends $.Objects.Optional<string>>(
  props?: Decorator.PartialProps
) {
  return Pattern<T>({
    key: "IPAddress",
    groups: extractGroups(props),
    regex: RegexConst.IP_ADDRESS,
    message: extractMessage(props, ErrorMessage.IPAddress()),
  });
}
