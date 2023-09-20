import makeValidator from "../../src/decorators/decorator.facade";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

export default function Truthy<T extends $.Objects.Optional>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Truthy",
      message: extractMessage(props, ErrorMessage.Truthy()),
      valid: !!value,
    }),
  });
}
