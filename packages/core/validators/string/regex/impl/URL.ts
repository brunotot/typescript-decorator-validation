import { DecoratorPartialProps } from "../../../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/decorators/decorator.utils";
import ErrorMessage from "../../../../src/messages/models/errors";
import RegexConst from "../../../../src/models/regex.constants";
import $ from "../../../../src/types";
import Pattern from "./../../regex/Pattern";

export default function URL<T extends $.Objects.Optional<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "URL",
    message: extractMessage(props, ErrorMessage.URL()),
    groups: extractGroups(props),
    regex: RegexConst.URL,
  });
}
