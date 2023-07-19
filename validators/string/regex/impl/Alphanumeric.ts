import ErrorMessage from "../../../../src/messages/impl/ErrorMessage";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import { DecoratorPartialProps } from "../../../../src/decorators/types/DecoratorProps.type";
import Pattern from "../Pattern";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/utils/decorator.utils";
import RegexConst from "../../../../src/model/constants/regex.constants";

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
