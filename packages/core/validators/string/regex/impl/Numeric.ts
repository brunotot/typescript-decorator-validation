import ErrorMessage from "../../../../src/messages/impl/ErrorMessage";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import { DecoratorPartialProps } from "../../../../src/decorators/types/DecoratorProps.type";
import Pattern from "../Pattern";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/utils/decorator.utils";
import RegexConst from "../../../../src/model/constants/regex.constants";

export default function Numeric<T extends $.Nullable<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "Numeric",
    regex: RegexConst.NUMERIC,
    groups: extractGroups(props),
    message: extractMessage(props, ErrorMessage.Numeric()),
  });
}
