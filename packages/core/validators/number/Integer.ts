import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorPartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import { $ } from "../../src/types/namespace/Utility.ns";

export default function Integer<T extends $.Nullable<number>>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (num) => ({
      key: "Integer",
      message: extractMessage(props, ErrorMessage.Integer(num!)),
      valid: num !== undefined && num !== null && Number.isInteger(num),
    }),
  });
}
