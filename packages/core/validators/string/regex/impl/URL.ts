import { DecoratorPartialProps } from "../../../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/decorators/decorator.utils";
import ErrorMessage from "../../../../src/messages/models/errors";
import RegexConst from "../../../../src/models/regex.constants";
import { $ } from "../../../../src/types/namespace/Utility.ns";
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
