import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { extractGroupsFromValidatorProps } from "../../src/model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../src/model/utility/type.utility";
import { $ } from "../../src/model/type/namespace/Utility.ns";

export type ArrayEveryType<T> = {
  test: $.Predicate<T>;
};

export default function ArrayEvery<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayEveryType<K>>
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayEvery",
      message: props.message,
      valid: (array ?? []).every(props.test),
    }),
  });
}
