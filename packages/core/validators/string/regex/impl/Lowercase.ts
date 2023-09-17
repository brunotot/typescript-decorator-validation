import { DecoratorPartialProps } from "../../../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/decorators/decorator.utils";
import ErrorMessage from "../../../../src/messages/models/errors";
import RegexConst from "../../../../src/models/regex.constants";
import $ from "../../../../src/types";
import Pattern from "../Pattern";

export default function Lowercase<T extends $.Objects.Optional<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "Lowercase",
    regex: RegexConst.LOWERCASE,
    groups: extractGroups(props),
    message: extractMessage(props, ErrorMessage.Lowercase()),
  });
}
