import { DecoratorPartialProps } from "../../../../src/decorators/decorator.types";
import ErrorMessage from "../../../../src/messages/model/errors";
import RegexConst from "../../../../src/model/constants/regex.constants";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/utils/decorator.utils";
import Pattern from "./../../regex/Pattern";

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
