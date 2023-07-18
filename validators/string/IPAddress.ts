import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { $ } from "../../src/types/namespace/Utility.ns";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import Pattern from "./Pattern";
import { extractGroups, extractMessage } from "../../src/utils/object.utils";

export default function IPAddress<T extends $.Nullable<string>>(
  props?: DecoratorPartialProps
) {
  return Pattern<T>({
    key: "IPAddress",
    groups: extractGroups(props),
    regex:
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    message: extractMessage(props, ErrorMessage.IPAddress()),
  });
}
