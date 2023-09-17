import { DecoratorPartialProps } from "../../../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/decorators/decorator.utils";
import ErrorMessage from "../../../../src/messages/models/errors";
import RegexConst from "../../../../src/models/regex.constants";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import Pattern from "../Pattern";

export default function Alpha<T extends $.Nullable<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "Alpha",
    regex: RegexConst.ALPHA,
    groups: extractGroups(props),
    message: extractMessage(props, ErrorMessage.Alpha()),
  });
}
