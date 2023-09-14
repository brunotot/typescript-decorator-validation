import { DecoratorPartialProps } from "../../../../src/decorators/decorator.types";
import ErrorMessage from "../../../../src/messages/model/errors";
import RegexConst from "../../../../src/model/constants/regex.constants";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/utils/decorator.utils";
import Pattern from "../Pattern";

export default function Alphanumeric<T extends $.Nullable<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "Alphanumeric",
    regex: RegexConst.ALPHANUMERIC,
    groups: extractGroups(props),
    message: extractMessage(props, ErrorMessage.Alphanumeric()),
  });
}
