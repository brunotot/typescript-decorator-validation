import { DecoratorPartialProps } from "../../../../src/decorators/decorator.types";
import ErrorMessage from "../../../../src/messages/model/errors";
import RegexConst from "../../../../src/model/constants/regex.constants";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/utils/decorator.utils";
import Pattern from "./../../regex/Pattern";

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
