import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { extractGroupsFromValidatorProps } from "../../src/model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../src/model/utility/type.utility";
import { $ } from "../../src/model/type/namespace/Utility.ns";

export type ArraySomeType<T> = {
  test: $.Predicate<T>;
};

export default function ArraySome<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArraySomeType<K>>
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArraySome",
      message: props.message,
      valid: (array ?? []).some(props.test),
    }),
  });
}
