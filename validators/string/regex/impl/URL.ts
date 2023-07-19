import ErrorMessage from "../../../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../../../src/decorators/types/DecoratorProps.type";
import Pattern from "./../../regex/Pattern";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/utils/decorator.utils";
import RegexConst from "../../../../src/model/constants/regex.constants";

export default function URL<T extends $.Nullable<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "URL",
    message: extractMessage(props, ErrorMessage.URL()),
    groups: extractGroups(props),
    regex: RegexConst.URL,
  });
}
