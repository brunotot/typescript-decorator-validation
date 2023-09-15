import { makeValidator } from "../../src/decorators/decorator.facade";
import { DecoratorImpartialProps } from "../../src/decorators/decorator.types";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/model/errors";
import { $ } from "../../src/types/namespace/Utility.ns";

type LengthType = {
  min: number;
  max: number;
};

export default function Length<T extends $.Nullable<string>>(
  props: DecoratorImpartialProps<LengthType>
) {
  const { min, max } = props;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Length",
      message: extractMessage(props, ErrorMessage.RangeLength(min, max)),
      valid: (value ?? "").length >= min && (value ?? "").length <= max,
    }),
  });
}
