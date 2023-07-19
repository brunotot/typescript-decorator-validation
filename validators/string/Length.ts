import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorImpartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";

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
