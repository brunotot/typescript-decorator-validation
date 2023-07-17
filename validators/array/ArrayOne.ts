import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { extractGroupsFromValidatorProps } from "../../src/model/utility/object.utility";
import { BasicValidatorProviderTypeMandatoryMessage } from "../../src/model/utility/type.utility";
import { $ } from "../../src/model/type/namespace/Utility.ns";

export type ArrayOneType<T> = {
  test: $.Predicate<T>;
};

export default function ArrayOne<K, T extends K[]>(
  props: BasicValidatorProviderTypeMandatoryMessage<ArrayOneType<K>>
) {
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayOne",
      message: props.message,
      valid: (array ?? []).filter(props.test).length === 1,
    }),
  });
}
