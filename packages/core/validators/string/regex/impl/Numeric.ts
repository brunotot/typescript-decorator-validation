import { DecoratorPartialProps } from "../../../../src/decorators/decorator.types";
import ErrorMessage from "../../../../src/messages/model/errors";
import RegexConst from "../../../../src/model/constants/regex.constants";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import {
  extractGroups,
  extractMessage,
} from "../../../../src/utils/decorator.utils";
import Pattern from "../Pattern";

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
