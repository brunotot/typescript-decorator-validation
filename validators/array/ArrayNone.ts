import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { extractGroupsFromValidatorProps } from "../../src/model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../src/model/utility/type.utility";
import { $ } from "../../src/model/type/namespace/Utility.ns";

export type ArrayNoneType<T> = {
  test: $.Predicate<T>;
};

export default function ArrayNone<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayNoneType<K>>
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayNone",
      message: props.message,
      valid: !(array ?? []).some(props.test),
    }),
  });
}
