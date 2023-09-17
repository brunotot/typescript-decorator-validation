import { DecoratorPartialProps } from "../../../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/decorators/decorator.utils";
import ErrorMessage from "../../../../src/messages/models/errors";
import RegexConst from "../../../../src/models/regex.constants";
import $ from "../../../../src/types";
import Pattern from "../Pattern";

export default function Alphanumeric<T extends $.Objects.Optional<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "Alphanumeric",
    regex: RegexConst.ALPHANUMERIC,
    groups: extractGroups(props),
    message: extractMessage(props, ErrorMessage.Alphanumeric()),
  });
}
