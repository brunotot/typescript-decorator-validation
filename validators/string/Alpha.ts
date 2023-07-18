import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { $ } from "../../src/types/namespace/Utility.ns";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import Pattern from "./Pattern";
import { extractGroups, extractMessage } from "../../src/utils/object.utils";

export default function Alpha<T extends $.Nullable<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "Alpha",
    regex: /^[a-zA-Z]+$/,
    groups: extractGroups(props),
    message: extractMessage(props, ErrorMessage.Alpha()),
  });
}
