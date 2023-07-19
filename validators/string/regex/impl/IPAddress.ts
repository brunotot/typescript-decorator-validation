import ErrorMessage from "../../../../src/messages/impl/ErrorMessage";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import { DecoratorPartialProps } from "../../../../src/decorators/types/DecoratorProps.type";
import Pattern from "./../../regex/Pattern";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/utils/decorator.utils";
import RegexConst from "../../../../src/model/constants/regex.constants";

export default function IPAddress<T extends $.Nullable<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "IPAddress",
    groups: extractGroups(props),
    regex: RegexConst.IP_ADDRESS,
    message: extractMessage(props, ErrorMessage.IPAddress()),
  });
}
